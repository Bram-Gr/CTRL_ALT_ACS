from fastapi import FastAPI
import pydantic
from src.models import makeADonation, changeDonationStatus, registerUser, getUsers

app = FastAPI()


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str | None = None):
#     return {"item_id": item_id, "q": q}
class User(pydantic.BaseModel):
    username: str
    password: str


class Donation(pydantic.BaseModel):
    description: str
    image: str
    status: str


@app.post("/donations/{user_id}")
def createDonations(user_id: int, donation: Donation):
    """   # summary = "Create a donation",
    # description = "make a donation by user_id","""
    makeADonation(user_id, donation)
    return {"user_id": user_id}


@app.put("/status/{manager_id}")
def updateDonationStatus(manager_id: int, donation: Donation):
    changeDonationStatus(manager_id, donation.status)
    return {"manager_id": manager_id}


@app.get("/donations")
def getDonationsList(description, image):
    response_model = description, image,
    summary = "show all the donations",
    description = "get list of all dontations"
    return {""}


@app.get("/users")
def getAllUsers():
    return getUsers()


@app.post("/user")
def createUser(user: User):
    print(f"this is my user {User}")
    registerUser(user.username, user.password)
    return {"return":"return"}


@app.post("/manager")
def createManager(user: User):
    response_model = {"username": user.username, "password": user.password},
    summary = "Create a manager",
    description = "submit a user to add to the database",
    return ""
