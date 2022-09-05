CREATE TABLE products
(
    product_name    VARCHAR(20) NOT NULL,
    category        VARCHAR(50) NOTNULL,
    price           bigint NOT NULL,
    description     VARCHAR(500) DEFAULT NULL,
    create_at       datetime(6) NOT NULL,
    update_at       datetime(6) DEFAULT NULL
)