import subprocess
import pathlib
from colorama import Fore as F
import time
import os

R = F.RESET


def detect(exe, config, weights, image):
    """Execute ./darknet detect {config} {weights} {image}"""
    result = subprocess.run(
        [f"./{exe}", "detect", config, weights, image],
        stdout=subprocess.PIPE
    )

    return result.stdout.decode('utf-8')


def run_darknet(image):
    """Run darknet on the image"""

    ROOT = pathlib.Path(__file__).parent.parent.parent.absolute()
    # Change directory to darknet
    os.chdir(ROOT / "static/assets/darknet")

    exe = "darknet"
    config = "cfg/yolov3.cfg"
    weights = "yolov3.weights"

    # Time the detection
    start = time.time()
    result = detect(exe, config, weights, image)
    end = time.time()

    print(f"{F.YELLOW}Time:{R} {end - start}")

    return result


def main():

    images = [
        "../../../static/img/good_couch.jpg",
        "../../../static/img/green_couch.png",
        "../../../static/img/brown_couch.png"
    ]

    for image in images:
        run_darknet(image)


if __name__ == "__main__":
    main()
