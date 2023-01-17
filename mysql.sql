CREATE  TABLE sandwiches.`permissions` ( 
	id                   INT UNSIGNED NOT NULL PRIMARY KEY,
	testPermission       BOOLEAN  NOT NULL DEFAULT (FALSE)    
 );
 
 CREATE  TABLE sandwiches.`token` ( 
	id                   INT UNSIGNED NOT NULL PRIMARY KEY,
	token               VARCHAR(128) NOT NULL,
    expiration			TIMESTAMP  DEFAULT (CURRENT_TIMESTAMP + 36000)  NOT NULL
 );