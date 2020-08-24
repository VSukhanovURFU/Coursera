--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 10.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    prod_name character varying(50) NOT NULL,
    prod_desc character varying(255),
    prod_price double precision NOT NULL,
    updated_at date DEFAULT '2019-01-01'::date NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 30
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (25, 'gener', 'gener desc', 123, '2019-10-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (28, 'gener', 'gener desc', 123, '2019-10-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (30, 'Носки', 'Мужские', 37, '2019-12-30');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (31, 'Колбаса', 'Копчёная', 345, '2019-10-18');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (32, 'qweqee', 'wewrererererew', 32, '2019-12-30');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (1, 'Хлеб', 'Чусовской', 22, '2017-02-12');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (2, 'Мясо', 'Говяжье', 350, '2017-03-01');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (4, 'Чай', 'Грузинский', 32, '2017-05-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (6, 'gener', 'gener desc', 123, '2017-07-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (7, 'gener', 'gener desc', 123, '2017-08-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (8, 'gener', 'gener desc', 123, '2017-08-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (9, 'gener', 'gener desc', 123, '2017-10-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (10, 'gener', 'gener desc', 123, '2017-11-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (11, 'gener', 'gener desc', 123, '2017-12-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (12, 'gener', 'gener desc', 123, '2018-01-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (13, 'gener', 'gener desc', 123, '2018-02-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (14, 'gener', 'gener desc', 123, '2018-03-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (15, 'gener', 'gener desc', 123, '2018-04-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (16, 'gener', 'gener desc', 123, '2019-01-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (17, 'gener', 'gener desc', 123, '2019-02-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (18, 'gener', 'gener desc', 123, '2019-03-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (19, 'gener', 'gener desc', 123, '2019-04-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (20, 'gener', 'gener desc', 123, '2019-05-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (21, 'gener', 'gener desc', 123, '2019-06-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (22, 'gener', 'gener desc', 123, '2019-07-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (23, 'gener', 'gener desc', 123, '2019-08-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (24, 'gener', 'gener desc', 123, '2019-09-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (26, 'gener', 'gener desc', 123, '2019-11-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (27, 'gener', 'gener desc', 123, '2019-12-11');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (33, 'Сухари', 'Продукт', 33, '2019-12-06');
INSERT INTO public.product (id, prod_name, prod_desc, prod_price, updated_at) VALUES (3, 'Спички', 'Быт', 12, '2017-04-11');


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 33, true);


--
-- Name: product PK_Products; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_Products" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

