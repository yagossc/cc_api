/* Replace with your SQL commands */
CREATE TABLE user_account (
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_pwd VARCHAR(64) NOT NULL,

  CONSTRAINT pk_user PRIMARY KEY (user_id)
);
