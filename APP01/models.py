from django.db import models

# Create your models here.
class student(models.Model):
    gender_choices=(
            (0,"女"),
            (1,"男"),
            (2,"null"),
        )
    name = models.CharField(max_length=20)
    number = models.CharField(max_length=10, unique=True)
    age = models.IntegerField()
    gender = models.IntegerField(choices=gender_choices,default=2)
    cls=models.ForeignKey("classes",on_delete=models.CASCADE,null=True)

class classes(models.Model):
    name=models.CharField(max_length=32)
