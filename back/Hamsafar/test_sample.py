import requests


def test_get_method():
    response = requests.get("http://127.0.0.1:8000/travels/all_cities/")
    assert response.json()["status"] == "success"


def test_post_method():
    response = requests.get("http://127.0.0.1:8000/travels/csrf_cookie/")
    token = response.cookies.get_dict()['csrftoken']
    header = {
        'X-CSRFToken': token,
    }

    data = {
        'username': 'aliagha',
        'password': 'noshirvani',
        're_password': 'noshirvani',
        'student_number': '40030212065',
    }
    response = requests.post("http://127.0.0.1:8000/travels/register/", json=data, cookies=response.cookies, headers=header)
    print(response.text)
    assert response.json()["status"] == "success"


def test_put_method():
    response = requests.get("http://127.0.0.1:8000/travels/csrf_cookie/")
    token = response.cookies.get_dict()['csrftoken']
    header = {
        'X-CSRFToken': token,
    }
    cookie = {
        'csrftoken': token,
    }
    data = {
        'username': 'aliali',
        'password': 'alialialiali',
    }
    response = requests.post("http://127.0.0.1:8000/travels/login/", data=data, headers=header, cookies=cookie)
    token = response.cookies.get_dict()['csrftoken']
    header = {
        'X-CSRFToken': token,
    }
    cookies = response.cookies.get_dict()
    data = {
        'traveler_id': '19',
    }

    response = requests.put("http://127.0.0.1:8000/travels/change_to_credit/", json=data, headers=header, cookies=cookies)
    print(response.text)
    assert response.json()["status"] == "success"


def test_delete_method():
    response = requests.get("http://127.0.0.1:8000/travels/csrf_cookie/")
    token = response.cookies.get_dict()['csrftoken']
    header = {
        'X-CSRFToken': token,
    }
    cookie = {
        'csrftoken': token,
    }
    data = {
        'username': 'aliali',
        'password': 'alialialiali',
    }
    response = requests.post("http://127.0.0.1:8000/travels/login/", data=data, headers=header, cookies=cookie)
    token = response.cookies.get_dict()['csrftoken']
    header = {
        'X-CSRFToken': token,
    }
    cookies = response.cookies.get_dict()
    response = requests.delete("http://127.0.0.1:8000/travels/cancel/", headers=header, cookies=cookies)
    print(response.text)
    assert response.json()["status"] == "success"



