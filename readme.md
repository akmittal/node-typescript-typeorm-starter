# Signup

### /signup POST
HTTP BODY 

    {
        "username":"username",
        "password:"password",
    }


# Login
### /login POST
HTTP BODY

    {
        "username":"username",
        "password:"password",
    }

# Stock
### /stock POST
HTTP BODY

    {
        "name":"stockname",
        "price:"123",
    }

### /stock GET
Optional query params
- sortColumn = name | price
- skip = 0 
- take = 10 (limit items 10 by default)

Returns List of all stocks

### /stock/:stockname GET

Returns single stock item