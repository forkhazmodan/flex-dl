# vpc ""s
region                       = "eu-north-1"
project_name                 = "mediastore"
environment                  = "dev"
vpc_cidr                     = "10.0.0.0/16"
public_subnet_az1_cidr       = "10.0.0.0/24"
public_subnet_az2_cidr       = "10.0.1.0/24"
private_app_subnet_az1_cidr  = "10.0.2.0/24"
private_app_subnet_az2_cidr  = "10.0.3.0/24"
private_data_subnet_az1_cidr = "10.0.4.0/24"
private_data_subnet_az2_cidr = "10.0.5.0/24"
ssh_id                       = "89.64.63.71/32"

database_snapshot_identifier = ""
database_instance_class      = "db.t2.micro"
database_instance_identifier = "dev-rds-db"
multi_az_deployment          = "false"

# acm variables
domain_name       = "forkhazmodan.mediastore.io"
alternative_names = "forkhazmodan.mediastore.io"

