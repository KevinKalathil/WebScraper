from flask import Blueprint, jsonify, request
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import json

vendorMapping = {
    'Amazon' : {
        'base': "https://www.amazon.ca",
        'url_part1': "https://www.amazon.ca/s?k=",
        'items': ['div', 's-asin'],
        'title': ['span', 'a-size-base-plus'],
        'price': ['span', 'a-offscreen'],
        'imgSrc':['img', 's-image'],
        'productUrl':['a', 'a-link-normal'],
        
    },
    'EBay' : {
        'base': "",
        'url_part1': "https://www.ebay.ca/sch/i.html?_from=R40&_trksid=p2510209.m570.l1313&_nkw=",
        'items': ['li', 's-item'],
        'title': ['h3', 's-item__title'],
        'price': ['span', 'ITALIC'],
        'imgSrc':['img', 's-item__image-img'],
        'productUrl':['a', None],        
    }

}
    # url_to_scrape = f"https://www.amazon.ca/s?k={'+'.join(scrape.split(' '))}&ref=nb_sb_noss_2" 

def Scrape(scrape, vendors):
    f=dict()
    
    for vendor in vendors:
        f[vendor]=[]
        url_to_scrape = f"{vendorMapping[vendor]['url_part1']}{'+'.join(scrape.split(' '))}" 

        request_page = urlopen(url_to_scrape)
        page_html = request_page.read()
        request_page.close()

        htmlSoup = BeautifulSoup(page_html, 'html.parser')

        items = htmlSoup.find_all(vendorMapping[vendor]['items'][0], class_=vendorMapping[vendor]['items'][1])
        count=0

        for item in items:
            title = (item.find(vendorMapping[vendor]['title'][0], class_=vendorMapping[vendor]['title'][1]))

            if not title==None:
                title = title.text.split(',')[0]
                if len(title)>30:
                    title = title[0:29]+'...'
            else: continue

            price = item.find(vendorMapping[vendor]['price'][0], class_=vendorMapping[vendor]['price'][1])
            
            if (not price==None):
                price = ''.join(price.text.split(','))
            else: continue

            imgSrc = item.find(vendorMapping[vendor]['imgSrc'][0], class_=vendorMapping[vendor]['imgSrc'][1])['src']

            productURL = f"{vendorMapping[vendor]['base']}{item.find(vendorMapping[vendor]['productUrl'][0], class_=vendorMapping[vendor]['productUrl'][1])['href']}"

            f[vendor].append([title, price,imgSrc, vendor, productURL])
            count+=1
        f[vendor] = f[vendor][0: min(len(f[vendor]), 20)]

    return f


main = Blueprint('main', __name__)

@main.route('/search', methods=['POST'])
def search():
    search_query = request.get_json()['query']
    vendors = request.get_json()['vendor']
    values = Scrape(search_query, vendors)
    return jsonify(values)

@main.route('/results')
def getResults():
    results = []
    return jsonify({'values':results})