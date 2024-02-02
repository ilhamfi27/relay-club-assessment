create table products (
  id bigint generated by default as identity,
  created_at timestamp with time zone not null default now(),
  sku character varying null,
  name character varying null,
  price double precision null default '0' :: double precision,
  primary key (id),
  unique(sku)
);

create table users (
  id bigint generated by default as identity,
  created_at timestamp with time zone not null default now(),
  username character varying not null,
  password character varying not null,
  name character varying not null,
  primary key (id),
  unique(username)
);

CREATE TABLE carts (
  id serial PRIMARY KEY,
  user_id bigint REFERENCES users DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE carts_products (
  cart_id integer REFERENCES carts,
  product_id bigint REFERENCES products,
  quantity integer,
  PRIMARY KEY (cart_id, product_id)
);

CREATE TYPE rule_type_enum AS ENUM (
  'BUY_X_GET_Y_FREE',
  'BULK_PURCHASE_DISCOUNT',
  'FREE_PRODUCT'
);

CREATE TABLE discount_rules (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  rule_type rule_type_enum,
  quantity INTEGER,
  discount_value DOUBLE PRECISION,
  discount_product_id INTEGER REFERENCES products(id)
);

alter table
  products disable row level security;

alter table
  users disable row level security;

-- seed product
insert into
  products (sku, name, price)
values
  ('ipd', 'Super iPad', 549.99),
  ('mbp', 'MacBook Pro', 1399.99),
  ('atv', 'Apple TV', 109.50),
  ('vga', 'VGA adapter', 30.00);

insert into
  users (username, password, name)
values
  (
    'admin',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    'Admin'
  ),
  (
    'ilham',
    'e467a85cdae98a0cb4edb5570aad4bd093dc2b652b6677a5949bd4ae36922bb4',
    'Ilham'
  );

INSERT INTO
  discount_rules (
    product_id,
    rule_type,
    quantity,
    discount_value,
    discount_product_id
  )
VALUES
  (1, 'BUY_X_GET_Y_FREE', 3, 1, 1),
  (2, 'BULK_PURCHASE_DISCOUNT', 5, 499.99, NULL),
  (3, 'FREE_PRODUCT', 1, NULL, 4);