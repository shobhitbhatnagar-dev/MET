BEGIN TRANSACTION;
DROP TABLE IF EXISTS "Modules";
CREATE TABLE IF NOT EXISTS "Modules" (
	"Id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"ModuleName"	TEXT,
	"CreatedOn"	TEXT NOT NULL,
	"ProjectId"	INTEGER,
	CONSTRAINT "FK_Modules_Projects_ProjectId" FOREIGN KEY("ProjectId") REFERENCES "Projects"("Id") ON DELETE RESTRICT
);
DROP TABLE IF EXISTS "Values";
CREATE TABLE IF NOT EXISTS "Values" (
	"Id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT,
	"Type"	TEXT
);
DROP TABLE IF EXISTS "Users";
CREATE TABLE IF NOT EXISTS "Users" (
	"Id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"Username"	TEXT,
	"PasswordHash"	BLOB,
	"PasswordSalt"	BLOB,
	"EmailId"	TEXT,
	"CreatedOn"	TEXT NOT NULL,
	"LastActive"	TEXT NOT NULL,
	"Department"	TEXT,
	"Role"	TEXT,
	"Status"	INTEGER NOT NULL
);
INSERT INTO "Modules" ("Id","ModuleName","CreatedOn","ProjectId") VALUES (1,'Training of Trainer & Training of Assessor ','2020-07-31 22:37:38.9017049',1),
 (2,'Qualification Pack – National Occupational Standard Builder','2020-07-31 22:38:04.0272425',1),
 (3,'Center Accreditation and Affiliation Module ','2020-07-31 22:38:16.8861318',1),
 (4,'Candidate Self Registration and Candidate Login and Profile Management','2020-07-31 22:40:03.073027',1),
 (5,'Fee Based Module','2020-07-31 22:40:29.7271081',1),
 (6,'NON PMKVY Module ','2020-07-31 22:40:43.1115108',1),
 (7,'Rozgar Mela','2020-07-31 22:40:56.3171489',1),
 (8,'TP – TC Onboarding and Target Allocation','2020-07-31 22:41:17.5443261',1),
 (9,'Candidate Training Lifecycle','2020-07-31 22:41:30.2842385',1),
 (10,'Batch Creation and Candidate Enrollment','2020-07-31 22:41:46.9770518',1),
 (11,'Assessment, Re-Assessment and Certification','2020-07-31 22:42:06.2971617',1),
 (12,'Budget and Payout','2020-07-31 22:42:20.3967916',1),
 (13,'Placement','2020-07-31 22:42:32.1642398',1),
 (14,'Continuous Monitoring ','2020-07-31 22:42:48.339099',1),
 (15,'Third Party Integrations','2020-07-31 22:43:00.7513135',1),
 (16,'API Integration - States','2020-07-31 22:43:17.4390477',1),
 (17,'API Integration - Central Ministry','2020-07-31 22:43:34.4095029',1),
 (18,'Nano BI Report','2020-07-31 22:43:46.2073524',1),
 (19,'Nano BI Dashboard','2020-07-31 22:43:58.0710836',1),
 (20,'Excel Report','2020-07-31 22:44:17.6538124',1);
INSERT INTO "Values" ("Id","Name","Type") VALUES (1,'CSR Team','dept'),
 (2,'Fee Based Team','dept'),
 (3,'Finance Team','dept'),
 (4,'IISC Team','dept'),
 (5,'Legal Team','dept'),
 (6,'LRT Team','dept'),
 (7,'Marketing Team','dept'),
 (8,'Non PMKVY Team','dept'),
 (9,'Standards Team','dept'),
 (10,'PMKVY STT Team','dept'),
 (11,'PMKVY RPL Team','dept'),
 (12,'PMKVY SP Team','dept'),
 (13,'PMKVY Monitoring Team','dept'),
 (14,'States Team','dept'),
 (15,'TOT & TOA Team','dept'),
 (16,'SSC Governance Team','dept'),
 (17,'IT Team','dept'),
 (18,'Technical Vendor','dept'),
 (19,'admin','role'),
 (20,'requester','role'),
 (21,'dev','role'),
 (22,'it','role');
INSERT INTO "Users" ("Id","Username","PasswordHash","PasswordSalt","EmailId","CreatedOn","LastActive","Department","Role","Status") VALUES (1,'vivek','����Ͻy�''4NY��c�
�����Z���eY�	��-��''
��9������4؅�|ӝc���ƹ',X'00e75746951995d7a413464a9bea602772f41d8fbc9c434edaf1de6a79c5a46b02aaca4d38ae92c7539b758c54f862e58e49f1d43bb1c92c322531dcd6af7389ff7b3e5c93d6bc7c18fcbb601b1f40766cd0064b7fa253044228cc33dff440b9c7def6328eeaf3c4d56cf84e2a76456efc3d828cc95d6acee8325cf8f134d5c3','abc5@gmail.com','2020-07-31 12:15:37.0902816','2020-07-31 12:15:37.0919277','it','admin',0),
 (2,'shobhit','(C���1jnL��z����Po3V#]��H�)��?oI�TA��n上��#��٢j��@��R','kk
��o��:1,��^����*������۞gL��o]|��O7{��[���W�:����z?wx��$��0l���x~XfO��j���fKj��iX+5v(\/o;e{[��	���:;c��','er.shobhitbhatnagar@gmail.com','2020-07-31 12:20:18.6252179','2020-07-31 12:20:18.6274256','it','admin',1),
 (3,'shivay',X'eedea72bb96b572abc230ee8b515fd535e0337a573b5692ec340ed3f00a7485d6bb9634040939e96c3cd9ac991920501e9635abd1a4221e0ea971a2385187415','ߙ�g�+&Ӫ����S�0�4UKZ�1Y��1�ɥ��F97�g��$HDy&IWc�X1���@��B�R��Z�Jՙ��''��A9��5X�Я�Ng�K������~�nT���ġ�f40
k�ߏXH*���','shivay@gmail.com','2020-07-31 15:20:45.5310669','2020-07-31 15:20:45.5310706','Technical Vendor','dev',1),
 (4,'garima','e�	������p@��:�l"C��{(��f:���j�a$j+�Ō�FB�%����q����[�v��3v','J��"�bU��J|�u�Ep^%)����v�~zIaC�CE��t9\Ax@.�S����I@�8���M���S��`�w+mVqgb���_�u�_�MƱ�k��=0~tja�>"�:�9�®#��7�6���s��','er.garimabhatnagar@gmail.com','2020-07-31 15:25:05.2078262','2020-07-31 15:25:05.2078301','Non PMKVY Team','requester',1),
 (5,'sharad','�hπع��v�fIw�|-��6�N=�u�E�Z��w�o�J�tV�~����_�ߏ�X$���4��',X'2d51d4cad1f641b7008f78b903f15c43cf19f76bd79b445e67d559c3c797222876129d4f44da0202f81fe2393f593a9e518a880f8c0c8c5c6417082640fed6958e710de38a784c1d4c44004193584c4b0cdc1a5e021d8d838f2e319960e12c646568d96ed3f7682efeadcedb836430c215a6833a95a35a07b7afd4bcc5773297','mailsbhatnagar@gmail.com','2020-07-31 15:27:47.9952787','2020-07-31 15:27:47.9952833','IT Team','it',1);
DROP INDEX IF EXISTS "IX_Modules_ProjectId";
CREATE INDEX IF NOT EXISTS "IX_Modules_ProjectId" ON "Modules" (
	"ProjectId"
);
COMMIT;
