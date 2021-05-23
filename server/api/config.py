class AppConfig(object):
    SQLALCHEMY_DATABASE_URI = 'postgresql://ynevjllfjuefqu:326274812ad9aa1f8187a417d3967cbcab94c3e809988ac28b1ee1329336575e@ec2-54-74-35-87.eu-west-1.compute.amazonaws.com:5432/decdbrth6mebd7'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # this is an object to store the attributes
    # that the flask app config requires

    # database uri -> link to database
    # track modifications -> prevents modifications to database from being tracked
    # therefore removing overhead
