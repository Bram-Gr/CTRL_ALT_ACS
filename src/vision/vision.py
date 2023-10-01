import mediapipe as mp
import pathlib

ROOT = pathlib.Path(__file__).parent.parent.parent.resolve()
image_path = ROOT / "static/img/green_couch.png"

mp_img = mp.Image.create_from_file(str(image_path))


tflite = ROOT / "static/assets/efficientdet_lite2.tflite"

BaseOptions = mp.tasks.BaseOptions
ObjectDetector = mp.tasks.vision.ObjectDetector
ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

options = ObjectDetectorOptions(
    base_options=BaseOptions(model_asset_path=str(tflite)),
    max_results=15,
    running_mode=VisionRunningMode.IMAGE)


results = None
with ObjectDetector.create_from_options(options) as detector:
    # with ImageClassifier.create_from_options(options) as classifier:
    results = detector.detect(mp_img).detections
    # results = classifier.classify(mp_img)

result_types = {}

for detection in results:
    print(f"{detection.__dict__['categories'][0].score} - "
          f"{str(detection.__dict__['categories'][0].category_name)}")
    result_types.update({str(detection.__dict__['categories'][0].score):
                         detection.__dict__['categories'][0].category_name})


# Filter the results to only include the highest confidence detections key and value.
highest_confidence_detection = result_types[max(result_types.keys())]


def get_detection(image: pathlib.Path | str) -> str:
    """Returns the highest confidence detection from the image.

    Args:
        image (pathlib.Path | str): Path to the image.

    Returns:
        str: The highest confidence detection.
    """
    mp_img = mp.Image.create_from_file(str(image))

    results = None
    with ObjectDetector.create_from_options(options) as detector:
        results = detector.detect(mp_img).detections

    result_types = {}

    for detection in results:
        print(f"{detection.__dict__['categories'][0].score} - "
              f"{str(detection.__dict__['categories'][0].category_name)}")
        result_types.update({str(detection.__dict__['categories'][0].score):
                             detection.__dict__['categories'][0].category_name})

    # Filter the results to only include the highest confidence detections key and value.
    highest_confidence_detection = result_types[max(result_types.keys())]

    return highest_confidence_detection
