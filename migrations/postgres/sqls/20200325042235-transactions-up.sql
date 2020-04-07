/* Replace with your SQL commands */
CREATE TABLE transactions (
  transaction_id UUID NOT NULL,
  transaction_nsu TEXT NOT NULL,
  transaction_value FLOAT(2),
  transaction_cflag VARCHAR(1),
  transaction_type VARCHAR(1),
  transaction_date TEXT,

  CONSTRAINT pk_transaction PRIMARY KEY (transaction_id)
);
