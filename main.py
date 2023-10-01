from fastapi import FastAPI
import pydantic
from src.models.models import makeADonation, changeDonationStatus, registerUser, getUsers, generate_serialized_id, registerManager, getDonations

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
    # userId: int | None
  
class Manager(pydantic.BaseModel):
    username: str
    password: str

class Donation(pydantic.BaseModel):
    userId: int
    description: str
    image: str
   



@app.put("/status/{manager_id}")
def updateDonationStatus(manager_id: int, donation: Donation):
    changeDonationStatus(manager_id, donation.status)
    return {"manager_id": manager_id}




@app.get("/users")
def getAllUsers():
    return getUsers()


@app.post("/user")
def createUser(user: User):
    registerUser(user.username, user.password, generate_serialized_id("users"))
    return {"return":"return"}


@app.post("/manager")
def createManager(manager: Manager):
   registerManager(manager.username, manager.password, generate_serialized_id("managers"))
   return {"return":"return"}

@app.post("/donations")
def createDonations(donation: Donation):
    makeADonation(donation.userId, generate_serialized_id("donations"), donation.description, donation.image)
    return {"user_id"}


@app.get("/all-donations/{donationId}")
def getDonationsList(donationId):
    return getDonations(donationId)
    