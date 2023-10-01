from fastapi import FastAPI
import shutil
import pydantic
import base64
import os
from src.models.models import makeADonation
from src.models.models import changeDonationStatus
from src.models.models import registerUser
from src.models.models import getUsers
from src.models.models import generate_serialized_id
from src.models.models import registerManager
from src.models.models import getDonations
from src.vision.vision import is_furniture

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
    # userChoice: str


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


@app.post("/user")
def createUser(user: User):
    registerUser(user.username, user.password, generate_serialized_id("users"))
    return {"Received": user.username}


@app.post("/donations")
def createDonations(donation: Donation):

    # Convert the base64 string to an image
    decoded_string = base64.b64decode(donation.image)

    with open("temp.jpg", "wb") as f:
        print(f.write(decoded_string))

    image = "temp.jpg"
    # Copy the image
    shutil.copyfile(image, "temp2.jpg")

    result: tuple[bool, str] = is_furniture(image, "couch")

    # Delete the image
    os.remove(image)

    print(f"Is furniture: {result[0]}")
    print(f"Result: {result[1]}")

    makeADonation(donation.userId, generate_serialized_id(
        "donations"), donation.description, donation.image)

    return {result[0]: result[1]}


@app.get("/get-donations/{donationId}")
def getDonationsList(donationId):
    return getDonations(donationId)
