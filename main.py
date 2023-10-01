from fastapi import FastAPI
import pydantic
from src.models.models import makeADonation
from src.models.models import changeDonationStatus
from src.models.models import registerUser
from src.models.models import getUsers
from src.models.models import generate_serialized_id
from src.models.models import registerManager
from src.models.models import getDonations

app = FastAPI()


class User(pydantic.BaseModel):
    username: str
    password: str


class Manager(pydantic.BaseModel):
    username: str
    password: str


class Donation(pydantic.BaseModel):
    userId: int
    description: str
    image: bytes


@app.put("/status/{manager_id}")
def updateDonationStatus(manager_id: int, donation: Donation):
    changeDonationStatus(manager_id, donation.status)
    return {"manager_id": manager_id}


@app.get("/users")
def getAllUsers():
    return getUsers()


@app.post("/manager")
def createManager(manager: Manager):
    registerManager(manager.username, manager.password,
                    generate_serialized_id("managers"))
    return {"return": "return"}


@app.post("/user")
def createUser(user: User):
    registerUser(user.username, user.password, generate_serialized_id("users"))
    return {"Received": user.username}


@app.post("/donations")
def createDonations(donation: Donation):
    makeADonation(donation.userId, generate_serialized_id(
        "donations"), donation.description, donation.image)
    return {"Received": donation.userId}


@app.get("/get-donations/{donationId}")
def getDonationsList(donationId):
    print(f"{donationId}")
    return getDonations(donationId)
