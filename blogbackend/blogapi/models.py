from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.
STATUS_CHOICES =[ 
    ('draft', 'Draft'),
    ('published', 'Published'),
]

GENDER_CHOICES = [
    ('male','Male'),
    ('female','Female')
]
  
class BlogUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not username:
            raise ValueError("Users must have a name")
        
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password,**extra_fields):
        user = self.create_user(email, username, password,**extra_fields)
        user.is_admin = True
        user.is_staff =True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class BlogUser(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=25,unique=True)
    email = models.EmailField()
    profilephoto = models.ImageField(upload_to='photos/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(GENDER_CHOICES)

    objects= BlogUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS= ['email']

    def __str__(self):
        return self.username

class BlogPost(models.Model):
    heading= models.TextField()
    content= models.TextField()
    author= models.ForeignKey(BlogUser, on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
    status= models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    def __str__(self):
        return self.heading