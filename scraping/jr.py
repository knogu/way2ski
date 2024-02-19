import time
import requests
from bs4 import BeautifulSoup
import re
import json

def extract_time(pattern, row):
    match = re.search(pattern, row.find("ul").text)
    return match.group(1) if match else None
    

# url: 列車詳細のurl
def get_detail(url, is_to_tokyo):
    response = requests.get(url)
    response.encoding='utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all("tr", class_="time")
    ret = {}
    for row in rows:
        station_name = row.find("a").text
        if is_to_tokyo and station_name != "東京":
            ret[station_name] = extract_time(r"(.*)\s発", row)
        else:
            ret[station_name] = extract_time(r"(.*)\s着", row)
        
    print(ret)
    return ret

run_detail_url = 'https://www.jreast-timetable.jp/2402/timetable/tt1647/1647040.html#time_19'
response = requests.get(run_detail_url)
response.encoding='utf-8'
time.sleep(3)

soup = BeautifulSoup(response.text, 'html.parser')

pattern = re.compile('time_.*')
data_list = soup.find_all(id=pattern)

all_tr = soup.find_all('tr')
run_detail_list = []
for data in all_tr:
    # one td is for train runs in one hour
    first_td = data.find('td')

    a_tags = data.find_all('a')
    rel_urls_for_details = [a.get('href') for a in a_tags]
    
    for run_detail_url in rel_urls_for_details:
        match = re.search(r'train.*', run_detail_url)
        abs_url = 'https://www.jreast-timetable.jp/2402/' + match.group()
        run_detail_list.append(get_detail(abs_url, True))
        time.sleep(3)
        # break early while developing
        break
    break
print(json.dumps(run_detail_list, ensure_ascii=False))
