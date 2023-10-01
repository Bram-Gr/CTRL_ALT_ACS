import mediapipe as mp
import pathlib

ROOT = pathlib.Path(__file__).parent.parent.parent.resolve()
image_path = ROOT / "static/img/desk.png"

mp_img = mp.Image.create_from_file(str(image_path))


tflite = ROOT / "static/assets/ssd_mobilenet_v2.tflite"

BaseOptions = mp.tasks.BaseOptions
ObjectDetector = mp.tasks.vision.ObjectDetector
ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

options = ObjectDetectorOptions(
    base_options=BaseOptions(model_asset_path=str(tflite)),
    max_results=5,
    running_mode=VisionRunningMode.IMAGE)

results = None
with ObjectDetector.create_from_options(options) as detector:
    # The detector is initialized. Use it here.
    results = detector.detect(mp_img).detections

for detection in results:
    print(f"Label: {str(detection.__dict__['categories'][0].score)} - "
          f"Label: {str(detection.__dict__['categories'][0].category_name)}")
