terraform {
  backend "s3" {
    bucket         = "chmax.mediastore.terraform.v1"
    key            = "terraform-module/mediastore/terraform.tfstate"
    region         = "eu-north-1"
    profile        = "terraform_user"
    dynamodb_table = "terraform-state-lock"
  }
}