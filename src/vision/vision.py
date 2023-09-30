import torch
from torchvision import models, transforms
from PIL import Image
import requests


class ImageClassifier:
    def __init__(self):
        # Load a pre-trained ResNet model
        self.model = models.resnet50(pretrained=True)
        self.model.eval()  # Set the model to evaluation mode
        self.labels_url = "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json"
        self.labels = requests.get(self.labels_url).json()

        # Define image transformation for preprocessing
        self.preprocess = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[
                                 0.229, 0.224, 0.225]),
        ])

    def classify_image_url(self, image_url):
        # Load and preprocess the image from the URL
        image = Image.open(requests.get(image_url, stream=True).raw)
        input_tensor = self.preprocess(image)
        input_batch = input_tensor.unsqueeze(0)

        # Make predictions
        with torch.no_grad():
            output = self.model(input_batch)

        _, predicted_idx = torch.max(output, 1)
        predicted_label = self.labels[predicted_idx.item()]

        return predicted_label


def main():

    # Replace with the URL of the image you want to classify
    image_url = "https://example.com/your_image.jpg"
    classifier = ImageClassifier()
    predicted_label = classifier.classify_image_url(image_url)
    print(f"The image is classified as: {predicted_label}")


if __name__ == "__main__":
    main()
