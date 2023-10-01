import mediapipe as mp
import pathlib

ROOT = pathlib.Path(__file__).parent.parent.parent.resolve()


def get_detection(image: pathlib.Path | str) -> str:
    """Returns the highest confidence detection from the image
    and image classifier.

    Args:
        image (pathlib.Path | str): Path to the image.

    Returns:
        str: The highest confidence detection.
    """

    tflite = ROOT / "static/assets/efficientdet_lite2.tflite"

    BaseOptions = mp.tasks.BaseOptions

    ObjectDetector = mp.tasks.vision.ObjectDetector
    ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
    VisionRunningMode = mp.tasks.vision.RunningMode

    options = ObjectDetectorOptions(
        base_options=BaseOptions(model_asset_path=str(tflite)),
        max_results=15,
        running_mode=VisionRunningMode.IMAGE)

    mp_img = mp.Image.create_from_file(str(image))

    results = None
    with ObjectDetector.create_from_options(options) as detector:
        results = detector.detect(mp_img).detections

    result_types = {}

    for detection in results:
        result_types.update(
            {str(detection.__dict__['categories'][0].score):
             detection.__dict__['categories'][0].category_name}
        )

    highest_confidence_detection = result_types[max(
        result_types.items(), key=lambda x: x.__getitem__(0))[0]]

    return highest_confidence_detection


def main():

    # image_path = ROOT / "static/img/green_couch.png"
    image_paths = [
        ROOT / "static/img/green_couch.png",
        ROOT / "static/img/blue_couch.png",
        ROOT / "static/img/busted_couch.jpg",
        ROOT / "static/img/good_couch.jpg",
        ROOT / "static/img/white_lounge.png",
        ROOT / "static/img/other_desk.png",
        ROOT / "static/img/white_lamp.png",
    ]

    # print(get_detection(image_path))
    for image in image_paths:
        print(get_detection(image))


if __name__ == "__main__":
    main()
