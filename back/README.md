## Hamsafar Yab
## Endpoints

### `POST /register/`

Sign up an account.

**Parameters:**
- student number
- password

**Response:**
```json
{
"message": "User created successfully",
 "status": "success"
 }

```
### `POST /login/`

login as an account.

**Parameters:**
- student number
- password

**Response:**
```json
{
"message": "User authenticated",
 "status": "success"
 }

```


### `POST /logout/`

log out an account.

*needs to be logged in*

**Response:**
```json
{
"message": "Logged out",
 "status": "success"
 }

```
### `GET /csrf_cookie/`

set a csrf cookie



**Response:**
```json
{
 "message": "cookie was set"
}
```

### `GET /travels/`

Get every travels of a user


**Response:**
```json
{
"data": [
        {
            "id": 8,
            "origin_city": "Babol",
            "origin_location": "dar asli",
            "destination_city": "Amol",
            "destination_location": "falake",
            "made_by": "pineappleunderthesea",
            "travelers": [
                {
                    "id": 6,
                    "name": "pineapple underthesea"
                }
            ],
            "situation": "3",
            "time": ""
        },
        {
            "id": 9,
            "origin_city": "Babol",
            "origin_location": "dar asli",
            "destination_city": "Amol",
            "destination_location": "falake",
            "made_by": "pineappleunderthesea",
            "travelers": [
                {
                    "id": 6,
                    "name": "pineapple underthesea"
                }
            ],
            "situation": "3",
            "time": ""
        },
        {
            "id": 10,
            "origin_city": "Babol",
            "origin_location": "dar asli",
            "destination_city": "Amol",
            "destination_location": "falake",
            "made_by": "pineappleunderthesea",
            "travelers": [
                {
                    "id": 6,
                    "name": "pineapple underthesea"
                }
            ],
            "situation": "3",
            "time": ""
        },
        {
            "id": 11,
            "origin_city": "Babol",
            "origin_location": "dar asli",
            "destination_city": "Amol",
            "destination_location": "falake",
            "made_by": "pineappleunderthesea",
            "travelers": [
                {
                    "id": 1,
                    "name": " "
                },
                {
                    "id": 2,
                    "name": " "
                },
                {
                    "id": 6,
                    "name": "pineapple underthesea"
                },
                {
                    "id": 3,
                    "name": "parko manan"
                }
            ],
            "situation": "1",
            "time": ""
        }
    ],
    "status": "success"
 }

```

### `GET /active_travel/`

Get user's active travel


**Response:**
```json
{
    "data": {
        "id": 11,
        "origin_city": "Babol",
        "origin_location": "dar asli",
        "destination_city": "Amol",
        "destination_location": "falake",
        "situation": "1",
        "travelers": [
            {
                "id": 1,
                "name": "ghali ala "
            },
            {
                "id": 2,
                "name": "ali agha "
            },
            {
                "id": 6,
                "name": "pineapple underthesea"
            },
            {
                "id": 3,
                "name": "parkosde manan"
            }
        ],
        "time": ""
    },
    "status": "success"
}

```

### `POST /create/`

Create a new travel

**Parameters:**
- is_driver
- origin_id
- destination_id

**Response:**
```json
{
  "message": "travel is made successfully", 
  "status": "success"
}

```

### `GET /authenticated/`

Checks if user is authenticated


**Response:**
```json
{
  "isAuthenticated": "success",
  "status": "success"
}

```


### `POST /join/`

Join a travel

**Parameters:**
- travel_id

**Response:**
```json
{
"message": "joined successfully",
 "status": "success"
 }

```

### `PUT /start/`

Changes active travel's situation from not started to traveling

**Response:**
```json
{
"message": "started successfully",
 "status": "success"
 }
```


### `POST /set_price/`

Set price for active travel

**Parameters:**
- price
- card_number

**Response:**
```json
{
"message": "price set successfully",
 "status": "success"
 }

```


### `PUT /finish/`

finish the ongoing travel



**Response:**
```json
{
"message": "finished successfully",
 "status": "success"
 }

```



### `PUT /change_to_cash/`

Change travel's payment method to cash

**Parameters:**
- traveler_id

**Response:**
```json
{
"message": "successfully changed to cash",
 "status": "success"
 }

```

### `PUT /change_to_credit/`

Change travel's payment method to cash

**Parameters:**
- traveler_id

**Response:**
```json
{
"message": "successfully changed to credit",
 "status": "success"
 }

```
### `GET /all_cities/`

Get every available city


**Response:**
```json
{
    "data": [
        {
            "name": "Amol",
            "id": 1
        },
        {
            "name": "Babol",
            "id": 2
        }
    ],
    "status": "success"
}

```

### `GET /city_locations/`

Get every location of a city
**Parameters:**
- city_id



**Response:**
```json
{
    "data": [
        {
            "name": "falake",
            "id": 1
        },
        {
            "name": "sadaf",
            "id": 3
        }
    ],
    "status": "success"
}
```

### `DELETE /cancel/`

Cancel user's active travel

**Response:**
```json
{
  "message": "deleted successfully",
  "status": "success"
 }
```
### `GET /search/`

Get every location of a city
**Parameters:**
- origin_id
- destination_id



**Response:**
```json
{
    "data": [
        {
            "id": 11,
            "origin_city": "Babol",
            "origin_location": "dar asli",
            "destination_city": "Amol",
            "destination_location": "falake",
            "made_by": "pineappleunderthesea",
            "travelers": [
                {
                    "id": 1,
                    "name": " "
                },
                {
                    "id": 2,
                    "name": " "
                },
                {
                    "id": 6,
                    "name": "pineapple underthesea"
                },
                {
                    "id": 3,
                    "name": "parkosde manan"
                }
            ],
            "situation": "1",
            "time": ""
        }
    ],
    "status": "success"
}
```
