import re

def clean_line(html):
    notag = re.sub("<.*?>", " ", html)
    return notag


def get_data():
    data = []

    with open('text') as f:
        for line in f:
            clean = clean_line(line)
            if clean and len(clean) > 2 and len(clean) < 200:
                clean = clean_line(line)
                print(clean)
                data.append(clean)
    return data


