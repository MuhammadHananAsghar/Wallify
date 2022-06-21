from random_user_agent.params import SoftwareName, OperatingSystem
from random_user_agent.user_agent import UserAgent
import requests

class Zedge:
    def __init__(self):
        self.__headers = {
            'authority': 'api-gateway.zedge.net',
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
            'sec-ch-ua-mobile': '?1',
            'authorization': 'undefined',
            'user-agent': f'{self.__generateUserAgent()}',
            'x-auth-v2': 'true',
            'sec-ch-ua-platform': '"Android"',
            'accept': '*/*',
            'origin': 'https://www.zedge.net',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.zedge.net/',
            'accept-language': 'en-US,en;q=0.9',
        }

    def __generateUserAgent(self):
        software_names = [SoftwareName.CHROME.value]
        operating_systems = [OperatingSystem.WINDOWS.value, OperatingSystem.LINUX.value, OperatingSystem.ANDROID.value] 

        user_agent_rotator = UserAgent(software_names=software_names, operating_systems=operating_systems, limit=100)
        user_agent = user_agent_rotator.get_random_user_agent()
        return user_agent

    def getWallpapers(self, query, page=1, size=24):
        try:
            json_data = {
                'query': '\n    query search($input: SearchAsUgcInput!) {\n      searchAsUgc(input: $input) {\n        ...browseContentItemsResource\n      }\n    }\n    \n  fragment browseContentItemsResource on BrowseContentItems {\n    page\n    total\n    items {\n      ... on BrowseWallpaper {\n        id\n        contentType\n        title\n        tags\n        imageUrl\n        placeholderUrl\n        licensed\n      }\n\n      ... on BrowseRingtone {\n        id\n        contentType\n        title\n        tags\n        imageUrl\n        placeholderUrl\n        licensed\n        meta {\n          durationMs\n          previewUrl\n          gradientStart\n          gradientEnd\n        }\n      }\n    }\n  }\n\n  ',
                'variables': {
                    'input': {
                        'contentType': 'WALLPAPER',
                        'keyword': query,
                        'page': page,
                        'size': size,
                    },
                },
            }

            response = requests.post('https://api-gateway.zedge.net/', headers=self.__headers, json=json_data).json()
            
            data_response = response['data']['searchAsUgc']['items']
            datastore = [{"id": i.get("id"), "image": i.get("imageUrl")} for i in data_response if i.get("imageUrl").startswith("https://fsa.zobj")]
            return datastore
        except Exception as e:
            print(e)
            pass

        return False

    def __getID(self, item):
        return item.get("id")
    
    def retrieveWallpaper(self, wallpaperID):
        # wallpaperID = self.__getID(wallpaperItem)
        json_data = {
            'query': '\n    query contentDownloadUrl($itemId: ID!) {\n      contentDownloadUrlAsUgc(itemId: $itemId)\n    }\n  ',
            'variables': {
                'itemId': f'{wallpaperID}',
            },
        }

        response = requests.post('https://api-gateway.zedge.net/', headers=self.__headers, json=json_data).json()

        return response.get("data").get("contentDownloadUrlAsUgc")
