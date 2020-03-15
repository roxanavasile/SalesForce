import unittest
from selenium import webdriver
import time

driver = webdriver.Chrome(r"C:\Users\roxana\Downloads\chromedriver_win32\chromedriver.exe")
driver.get("file:///C:/Users/roxana/Desktop/downloadedRTP/blog.html")
time.sleep(2)
posted_successfully = False


def postsNumber():
    container = driver.find_element_by_id("container")
    all_children_by_tag_name = container.find_elements_by_tag_name("p")
    initial_children = str(len(all_children_by_tag_name))
    print(initial_children)
    return initial_children


def newPost():
    startPost = driver.find_element_by_class_name("btn-success")
    startPost.click()
    title = driver.find_element_by_id("title")
    title.send_keys("Selenium Testing")
    text = driver.find_element_by_id("text")
    text.send_keys("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    submit = driver.find_element_by_css_selector("#expandCollapse > form > p:nth-child(8) > input[type=button]")
    submit.click()


initial_number_of_posts = postsNumber()
time.sleep(3)

newPost()

time.sleep(3)
final_number_of_posts = postsNumber()


if final_number_of_posts < initial_number_of_posts:
    posted_successfully = False


def log_details(a):
    if a:
        with open(r"../log/postValidation.txt", "w", encoding="utf8") as output:
            output.write("Posted successfully.")
    else:
        with open(r"../log/postValidation.txt", "w", encoding="utf8") as output:
            output.write("                   ERROR                                 ")


log_details(posted_successfully)
driver.close()
