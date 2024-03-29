create table products (
  id bigint generated by default as identity,
  created_at timestamp with time zone not null default now(),
  sku character varying null,
  name character varying null,
  price double precision null default '0' :: double precision,
  primary key (id)
);

create table users (
  id bigint generated by default as identity,
  created_at timestamp with time zone not null default now(),
  username character varying not null,
  password character varying not null,
  name character varying not null,
  role character varying not null default 'buyer' :: character varying,
  primary key (id),
  unique(username)
);

create table carts (
  id serial PRIMARY KEY,
  user_id bigint REFERENCES users DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

create table carts_products (
  cart_id integer REFERENCES carts,
  product_id bigint REFERENCES products,
  quantity integer,
  PRIMARY KEY (cart_id, product_id)
);

create type rule_type_enum as enum (
  'BUY_X_GET_Y_FREE',
  'BULK_PURCHASE_DISCOUNT',
  'FREE_PRODUCT'
);

create table discount_rules (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  rule_type rule_type_enum,
  quantity INTEGER,
  discount_value DOUBLE PRECISION,
  discount_product_id INTEGER REFERENCES products(id),
  CONSTRAINT fk_discount_rules_product_id FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT fk_discount_rules_discount_product_id FOREIGN KEY (discount_product_id) REFERENCES products(id)
);

alter table
  products disable row level security;

alter table
  users disable row level security;

-- seed product
insert into
  products (id, sku, name, price)
values
  (1, 'ipd', 'Super iPad', 549.99),
  (2, 'mbp', 'MacBook Pro', 1399.99),
  (3, 'atv', 'Apple TV', 109.50),
  (4, 'vga', 'VGA adapter', 30.00);

insert into
  users (username, password, name, role)
values
  (
    'admin',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    'Admin',
    'owner'
  ),
  (
    'ilham',
    'e467a85cdae98a0cb4edb5570aad4bd093dc2b652b6677a5949bd4ae36922bb4',
    'Ilham',
    'owner'
  ),
  (
    'buyer',
    '6dbd0f28d0d97656768b7b4ed96255e67fd11740a44b1c4b575191b06e9e3a35',
    'Buyer',
    'buyer'
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
  (3, 'BUY_X_GET_Y_FREE', 3, 1, 3),
  (1, 'BULK_PURCHASE_DISCOUNT', 5, 499.99, NULL),
  (2, 'FREE_PRODUCT', 1, NULL, 4);