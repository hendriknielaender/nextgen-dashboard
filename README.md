# nextgen-dashboard
tRPC + react query + chakra ui dashboard

## Demo User Credentials
email: demo@dashboard.com
password: demo

## Localstack Setup
- Prerequisite: AWS CLI
- Configure CLI: 
    export AWS_ACCESS_KEY_ID=foobar
    export AWS_SECRET_ACCESS_KEY=foobar

How to create S3 Bucket:
    aws --endpoint-url=http://localhost:4566 s3 mb s3://YOUR_BUCKET_NAME
  Optional for file uploads:
    aws --endpoint-url=http://localhost:4572 s3api put-bucket-acl --bucket YOUR_BUCKET_NAME --acl public-read
