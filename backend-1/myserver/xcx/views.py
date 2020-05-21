from django.shortcuts import render
from django.http.response import JsonResponse
from django.views.decorators.http import require_http_methods
import requests
import json
import hashlib
# pip install python-memcached
import memcache

cache = memcache.Client(["127.0.0.1:11211"],debug=True)


def index(request):
    return JsonResponse({"username":"zhiliao"})

# @require_http_methods(['POST'])
# def login(request):
#     code = request.POST.get("code")
#     userinfo = request.POST.get("userinfo")
#     # userinfo = json.loads(userinfo,encoding="utf-8")
#     appid = "wx19f19ce2f674100f"
#     secret = "e295039e58c7f1c4c55b732aa28ebf2c"
#     code2SessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={jscode}&grant_type=authorization_code".format(appid="wx19f19ce2f674100f",secret=secret,jscode=code)
#     resp = requests.get(code2SessionUrl)
#     respDict = resp.json()
#     openid = respDict.get("openid")
#     session_key = respDict.get("session_key")
#     token = hashlib.md5((openid+session_key).encode("utf-8")).hexdigest()
#     cache.set(token,openid)
#     print("*"*10)
#     print(respDict)
#     print("*"*10)
#     return JsonResponse({"token":token})

@require_http_methods(['POST'])
def login(request):
    code = request.POST.get('code')
    userinfo = request.POST.get("userinfo")
    print(code)
    print(userinfo)
    appid = "......"
    secret = "......"
    code2SessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={code}&grant_type=authorization_code".format(appid=appid,secret=secret,code=code)
    resp = requests.get(code2SessionUrl)
    respDict = resp.json()
    openid = respDict.get("openid")
    session_key = respDict.get("session_key")
    # md5函数只能接收bytes数据类型，不能几首unicode字符串
    token = hashlib.md5((openid+session_key).encode("utf-8")).hexdigest()
    cache.set(token,openid,7*24*60*60)
    return JsonResponse({"token":token})

@require_http_methods(['POST'])
def aweibo(request):
    # 获取自定义的header，必须在前面加上一个HTTP_的前缀，然后全部转换成大写
    token = request.META.get('HTTP_TOKEN')
    if token:
        openid = cache.get(token)
        if not openid:
            return JsonResponse({"message": "请先登录！"})
        content = request.POST.get('content')
        print("openid:"+openid)
        print("content:"+content)
    else:
        return JsonResponse({"message":"请先登录！"})
    return JsonResponse({"result":1})