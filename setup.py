from setuptools import setup

setup(
	name='Podcatcher',
	version='1.0',
	description='A podcatcher built for the web',
	author='Sneagan', author_email='jackson@sneagan.com',
	url='http://podcatcher.com',
	install_requires=['flask', 'requests', 'feedparser']
)