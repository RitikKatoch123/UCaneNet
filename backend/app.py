from learner.CaneNet import CaneNet
trainer = CaneNet()
model = trainer.load_model()

if not model:
    trainer._load_dataset()
    print(trainer.get_class_names())
    trainer.prepare_model()
    trainer.train()
    trainer.get_classification_report()
    trainer.test()
    trainer.save_model()

pred_class = trainer.predict('backend/dataset/unzipped/Healthy/healthy (5).jpeg')
print(pred_class)
