## Deploy a Serverless static website in AWS S3 and Cloudfront using Github Actions

### System Architecture

![image](https://user-images.githubusercontent.com/106740093/214543575-71ff2607-0e2a-4f18-80f6-99f1c8658f84.png)

#### Aws services used:

> **IAM** to create user and give permissions   
> **S3** to create static website   
> **CloudFront** to redirect http from s3 to https   
> **ACM** to choose or issue certificate for domain   
> **Route53** to point domain to CloudFront distribution    


#### Step 1: Create S3 Bucket

**1.** Create a S3 Bucket from the AWS console. During bucket creation do not unblock public access for this bucket	we will setup permissions later

 ![image](https://user-images.githubusercontent.com/106740093/214543632-2900becc-36ab-4c10-bdff-704af0a9b97b.png)
 
**2.** Add the following code in Bucket policy under the permissions section of our created bucke that will allow access to put objects into bucket and give access to CloudFront distribution.

```javascript
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
                }
            }
        },
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/YOUR_ACCOUNT_NAME"
            },
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

**3.**	Below bucket policy edit Object Ownership and choose Object writer

 ![image](https://user-images.githubusercontent.com/106740093/214543992-8c4238a5-d6bb-432c-90d7-512d5f81ba6c.png)
 
**4.**	Enable Static website hosting in s3 bucket under properties section

 ![image](https://user-images.githubusercontent.com/106740093/214544021-977f1a83-ee92-456a-8944-04da633ceb89.png)

#### Step 2: Make a Cloudfront Distribution

**1.**	Navigate to the search bar and type in “CloudFront”. The CloudFront dashboard will now be displayed, where we will click on the “Create distribution”. Click on the Origin Domain Name field and select the S3 bucket you created earlier and Scroll down until we see “Viewer”. For “Viewer Protocol Policy”, select “Redirect HTTP to HTTPS” and chose or request certificate for your domain. Also you can change Price class Use only North America and Europe is the cheapest option.

![image](https://user-images.githubusercontent.com/106740093/214544069-e69c4b68-1ef6-4c14-aaa4-58e21fa67188.png)

**2.**	For the Default root object, enter index.html

![image](https://user-images.githubusercontent.com/106740093/214544123-0304bb14-b583-4e54-bcbd-3ddcc4d8a0df.png)

**3.** Next create custom error responses, it should look like this

![image](https://user-images.githubusercontent.com/106740093/214544149-4c6aedc0-2c4a-4d7d-88e6-678a84a13277.png)

**4.** Finally, create first invalidation with this path /*

![image](https://user-images.githubusercontent.com/106740093/214544164-3ebc4855-23be-46ad-a838-37c8c5c336b2.png)
 
#### Step 3: Point Domain to CloudFront

Now we need to configure our DNS to add an alias domain name that points to our CloudFront distribution. Navigate to Route 53 in aws console and click on hosted zone. Give a record name and you can set record type “A” to support IPv4. By enabling “Alias” route traffic to our created cloudfront distribution from the autocomplete drop down list then click create records to complete this step.

 ![image](https://user-images.githubusercontent.com/106740093/214544211-8f7f9ec7-15bf-4f4e-a8b1-a12975a6987e.png)
 
##### Step 4: Setting up our GitHub Action Secrets

We will use a GitHub Action to deploy our files into the S3 bucket by configuring two new secrets in our repository. These secrets are for our AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.   
Navigate to the Settings section in our GitHub repository and locate the Secrets section on the left-hand side. By clicking the “new repository secret” we are going to add a new secret for AWS_ACCESS_KEY_ID and paste in the access_key we got in our IAM step. Then we are going to add another secret for AWS_SECRET_ACCESS_KEY and paste in our secret_access_key. We have configured our GitHub Action Secrets and our IAM user has access to upload content to our S3 bucket.

 ![image](https://user-images.githubusercontent.com/106740093/214544282-a4620d02-a443-43fc-b4e1-80dabed667d1.png)

#### Step 5: Set GitHub Actions Deployment file

To get started, we’re going to create a new workflow. Now, we will go to our project root directory and we’ll create folder named .github and inside it, a folder named workflows. Create a file named main.yml inside .github/workflows folder. Example below

```
name: Build & deploy
on:
  push:
    branches:
      - dev
      
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
     
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-1
          
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 16.x
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: CI= npm run build
        
      - name: Deploy
        run: aws s3 sync ./build s3://YOUR_BUCKET_NAME --delete
        
      - name: Invalidate Cloudfront CDN
        run: aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_DISTRIBUTION_ID --paths '/*'
        env:
          CLOUDFRONT_DISTRIBUTION_ID: YOUR_CLOUDFRONT_DISTRIBUTION_ID

```
