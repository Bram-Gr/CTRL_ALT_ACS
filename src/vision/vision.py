import subprocess
import pathlib


def detect(config, weights, image):
    """Execute ./darknet detect {config} {weights} {image}"""
    result = subprocess.run(
        ['./darknet', 'detect', config, weights, image], stdout=subprocess.PIPE)
    return result.stdout.decode('utf-8')


def main():

    ROOT = pathlib.Path(__file__).parent.parent.parent.absolute()
    config = str(ROOT / "static/assets/darknet/cfg/yolov3.cfg")
    # weights = 'yolov3.weights'
    # image = 'data/dog.jpg'
    # print(detect(config, weights, image))


if __name__ == "__main__":
    main()
