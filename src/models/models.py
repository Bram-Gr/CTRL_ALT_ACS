from pathlib import Path
import pathlib
import sqlite3
from datetime import datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
WORKING = ROOT / "data"
print(f"ROOT: {ROOT}")

# # Define the input values
now = datetime.now()
date_accessed_value = datetime.now().strftime("%Y-%m-%d")
# loggit = logging.getLogger(__name__)

# # If the file does not exist create it
db_path: Path = Path(f"{WORKING}/habitatDb.db")
init_path: Path = Path(f"{WORKING}/schema.sql")


def read_sql_query(sql_path: pathlib.Path) -> str:
    """Read an SQL query from a file and returns it as a string."""
    return Path(sql_path).read_text()


# init the database
init_db = read_sql_query(init_path)

# Populate db if it does not exist
with sqlite3.connect(db_path, check_same_thread=False) as connn:
    cursor = connn.cursor()
    cursor.executescript(init_db)
    connn.commit()


def makeADonation(donationId, description, image, userId):
    with sqlite3.connect(db_path) as connn:
        cursor = connn.cursor()
        cursor.execute("INSERT INTO donations VALUES (?,?,?,?)",
                       (description, image, donationId, userId))
        connn.commit()


def changeDonationStatus(status, donationId):
    with sqlite3.connect(db_path) as connn:
        cursor = connn.cursor()
        cursor.execute(
            "UPDATE table donations_status VALUES (?)\
            WHERE donation_id =?", (status, donationId))
        connn.commit()


def generate_serialized_id(table):
    cursor.execute(f'SELECT COUNT(*) FROM {table}')
    count = cursor.fetchone()[0] + 1  # Get the current count and increment it
    serialized_id = count  # serialized ID with a prefix and zero-padded int
    return int(serialized_id)


def registerUser(username, password, userId):
    with sqlite3.connect(db_path) as connn:
        cursor = connn.cursor()
        print(f"{username, password}")
        cursor.execute("INSERT INTO users VALUES (?,?,?)",
                       (username, password, userId))
        connn.commit()


def registerManager(username, password, managerId):
    with sqlite3.connect(db_path) as connn:
        cursor = connn.cursor()
        print(f"{username, password}")
        cursor.execute("INSERT INTO users VALUES (?,?,?)",
                       (username, password, managerId))
        connn.commit()


def getUsers():
    result = ''
    with sqlite3.connect(db_path) as connn:
        cursor = connn.cursor()
        cursor.execute("SELECT * FROM users")
        result = cursor.fetchall()
    return result


def getDonations(donationId):
    result = ''
    with sqlite3.connect(db_path) as connn:
        cursor = connn.cursor()
        cursor.execute(
            "SELECT * FROM donations WHERE donation_id = ?", (donationId,))
        result = cursor.fetchone()
    return result
