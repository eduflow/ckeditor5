#!/usr/bin/env python
import time

try:
    from splinter import Browser
except ImportError:
    import sys

    sys.exit("pip install --user splinter selenium")

try:
    from selenium import webdriver
except ImportError:
    import sys

    sys.exit("pip install --user selenium")

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("window-size=800,600")
chrome_options.add_argument("window-position=200,200")
browser = Browser("chrome", options=chrome_options)
browser.visit("http://localhost:3999/sample/empty.html")
browser.find_by_css(".ck-editor__editable").click()
browser.find_by_css(".ck-editor__editable").fill(
    "splinter - python acceptance testing for web applications"
)

time.sleep(2)

if browser.is_text_present("splinter - python acceptance"):
    print("Yes, the text was written correctly!")
else:
    print("No we need to take a closer look")
