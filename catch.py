import os
import sys
from flask import Flask, session, render_template, request, redirect, url_for, make_response, current_app
import requests
import feedparser

app = Flask(__name__, static_folder='./', static_url_path='')

# Generate a secret random key for the session
app.secret_key = os.urandom(24)

class Feed:
    def __init__(self):
        self.title = None
        self.episodes = None
    
shows = []

def get_shows(podcast):
    feed = requests.get(podcast)
    parsed = feedparser.parse( feed.text )
    title = parsed[ "channel" ][ "title" ]
    items = parsed[ "items" ][0:5] # save five latest episodes
    
    temp = Feed()
    temp.title = title
    temp.episodes = items
    
    shows.append(temp)
    return podcast

@app.route('/remove', methods=['GET','POST'])
def remove():
    if request.method == 'POST':
        title = request.data
        podcasts = request.cookies.get('podcasts')
        print podcasts
        for i, podcast in enumerate(podcasts):
            print podcast['title'] # This is wrong b/c it's a url. need to check against shows variable
            if podcast['title'] == title:
                print 'should delete'
                del podcasts[i]
        print podcasts

@app.route('/run_post', methods=['GET','POST'])
def run_post():
    if request.method == 'POST':
        podcast = request.form['podcast']
        podcasts = request.cookies.get('podcasts')
        
        if podcasts:
            podcasts = podcasts.split(',')
            podcasts.append(get_shows(podcast))
        else:
            podcasts = []
            podcasts.append(get_shows(podcast))
                
        redirect_to_index = redirect(url_for('root'))
        response = current_app.make_response(redirect_to_index )
        response.set_cookie('podcasts', value=','.join(podcasts), max_age=None)
        response.set_cookie('run_post', value='true', max_age=None)
        return response

# Define a route for the webserver
@app.route('/')
def root():
    podcasts = request.cookies.get('podcasts')
    if podcasts:
        podcasts = podcasts.split(',')
    from_post = request.cookies.get('run_post')
    # use cookies.get(key) instead of cookies[key] to not get a
    # KeyError if the cookie is missing.

    if shows and len(shows) == 0:
        if podcasts:
            for podcast in podcasts:
                get_shows(podcast)
    
    response = current_app.make_response(render_template('index.html', shows=shows))
    response.set_cookie('run_post', value='false', max_age=None)        
    return response
    
if __name__ == '__main__':
	app.run( 
		host="127.0.0.1",
		port=int("8080")
	)