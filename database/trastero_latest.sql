--
-- PostgreSQL database dump
--

\restrict HoaeQzQqaVjx7qF8jkaMAcJv7MRWEag0sHG3gbxUCwDMI94tUsobwYz3MG8B8vH

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    label character varying(100) NOT NULL,
    orden integer DEFAULT 0
);


--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: imagenes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.imagenes (
    id integer NOT NULL,
    imagenes_detalle_id integer,
    trastero_id integer,
    ruta character varying(500) NOT NULL,
    posicion integer,
    created_at timestamp without time zone DEFAULT now(),
    ruta_thumb character varying(500),
    CONSTRAINT imagenes_posicion_check CHECK (((posicion >= 1) AND (posicion <= 4)))
);


--
-- Name: imagenes_detalle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.imagenes_detalle (
    id integer NOT NULL,
    trastero_id integer,
    nombre character varying(255) NOT NULL,
    descripcion text,
    precio numeric(10,2),
    negociable boolean DEFAULT false,
    acepta_cambio boolean DEFAULT false,
    categoria character varying(100),
    subcategoria character varying(100),
    km integer,
    anio integer,
    combustible character varying(50),
    cv integer,
    metros numeric(8,2),
    habitaciones integer,
    banos integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    subcategoria_id integer
);


--
-- Name: imagenes_detalle_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.imagenes_detalle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: imagenes_detalle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.imagenes_detalle_id_seq OWNED BY public.imagenes_detalle.id;


--
-- Name: imagenes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.imagenes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: imagenes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.imagenes_id_seq OWNED BY public.imagenes.id;


--
-- Name: preferencias_usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.preferencias_usuario (
    id integer NOT NULL,
    usuario_id integer,
    bg_color character varying(7) DEFAULT '#000000'::character varying,
    text_color character varying(7) DEFAULT '#ffffff'::character varying,
    accent_color character varying(7) DEFAULT '#667eea'::character varying,
    modal_color character varying(7) DEFAULT '#1a1a1a'::character varying,
    card_title character varying(7) DEFAULT '#1a1a2e'::character varying,
    navbar_color character varying(7) DEFAULT '#000000'::character varying,
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: preferencias_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.preferencias_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: preferencias_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.preferencias_usuario_id_seq OWNED BY public.preferencias_usuario.id;


--
-- Name: subcategorias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subcategorias (
    id integer NOT NULL,
    label character varying(100) NOT NULL,
    categoria_id integer NOT NULL,
    orden integer DEFAULT 0
);


--
-- Name: subcategorias_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.subcategorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: subcategorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.subcategorias_id_seq OWNED BY public.subcategorias.id;


--
-- Name: trasteros; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trasteros (
    id integer NOT NULL,
    usuario_id integer,
    nombre character varying(255) NOT NULL,
    ubicacion character varying(500),
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: trasteros_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.trasteros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: trasteros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.trasteros_id_seq OWNED BY public.trasteros.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    avatar_url character varying(500),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: imagenes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes ALTER COLUMN id SET DEFAULT nextval('public.imagenes_id_seq'::regclass);


--
-- Name: imagenes_detalle id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes_detalle ALTER COLUMN id SET DEFAULT nextval('public.imagenes_detalle_id_seq'::regclass);


--
-- Name: preferencias_usuario id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preferencias_usuario ALTER COLUMN id SET DEFAULT nextval('public.preferencias_usuario_id_seq'::regclass);


--
-- Name: subcategorias id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategorias ALTER COLUMN id SET DEFAULT nextval('public.subcategorias_id_seq'::regclass);


--
-- Name: trasteros id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trasteros ALTER COLUMN id SET DEFAULT nextval('public.trasteros_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categorias (id, label, orden) FROM stdin;
1	Motor	1
2	Inmobiliaria	2
3	Informática	3
4	Imagen y Sonido	4
5	Telefonía	5
6	Juegos	6
7	Casa y Jardín	7
8	Moda y complementos	8
9	Bebés	9
10	Deportes y náutica	10
11	Aficiones y ocio	11
12	Mascotas y agricultura	12
13	Servicios	13
14	Formación y libros	14
15	Otros	15
\.


--
-- Data for Name: imagenes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.imagenes (id, imagenes_detalle_id, trastero_id, ruta, posicion, created_at, ruta_thumb) FROM stdin;
99	32	2	http://localhost:5000/uploads/3/1776178844120-2f3fywb6slw.jpeg	1	2026-04-14 16:00:44.261961	http://localhost:5000/uploads/3/1776178844120-2f3fywb6slw_thumb.webp
100	32	2	http://localhost:5000/uploads/3/1776178859529-uoftlc85oyq.jpeg	2	2026-04-14 16:00:59.667187	http://localhost:5000/uploads/3/1776178859529-uoftlc85oyq_thumb.webp
101	32	2	http://localhost:5000/uploads/3/1776178859530-gzsy8coc1t.jpeg	3	2026-04-14 16:00:59.770334	http://localhost:5000/uploads/3/1776178859530-gzsy8coc1t_thumb.webp
\.


--
-- Data for Name: imagenes_detalle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.imagenes_detalle (id, trastero_id, nombre, descripcion, precio, negociable, acepta_cambio, categoria, subcategoria, km, anio, combustible, cv, metros, habitaciones, banos, created_at, updated_at, subcategoria_id) FROM stdin;
32	2	Centralita	vamos a ver	200.00	t	t	Motor	Coches	182000	2007	Gasolina	140	\N	\N	\N	2026-04-14 16:00:44.160708	2026-04-14 16:00:59.569836	\N
\.


--
-- Data for Name: preferencias_usuario; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.preferencias_usuario (id, usuario_id, bg_color, text_color, accent_color, modal_color, card_title, navbar_color, updated_at) FROM stdin;
\.


--
-- Data for Name: subcategorias; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.subcategorias (id, label, categoria_id, orden) FROM stdin;
1	Coches	1	1
2	Todoterreno	1	2
3	Coches clásicos	1	3
4	Coches sin carnet	1	4
5	Motos	1	5
6	Furgonetas	1	6
7	Camiones	1	7
8	Autobuses	1	8
9	Caravanas	1	9
10	Autocaravanas	1	10
11	Quads	1	11
12	Buggies	1	12
13	Karts	1	13
14	Tuning	1	14
15	Maquinaria	1	15
16	Recambios y accesorios	1	16
17	Otros de motor	1	17
18	Pisos	2	1
19	Casas	2	2
20	Locales	2	3
21	Garajes	2	4
22	Terrenos	2	5
23	Oficinas	2	6
24	Trasteros	2	7
25	Portátiles	3	1
26	Ordenadores	3	2
27	Componentes	3	3
28	Periféricos	3	4
29	Impresoras	3	5
30	Tablets	3	6
31	TV	4	1
32	Audio	4	2
33	Cámaras	4	3
34	Proyectores	4	4
35	Reproductores	4	5
36	Accesorios AV	4	6
37	Móviles	5	1
38	Tablets	5	2
39	Smartwatches	5	3
40	Accesorios telefonía	5	4
41	Consolas	6	1
42	Videojuegos	6	2
43	Juegos de mesa	6	3
44	Cartas coleccionables	6	4
45	Muebles	7	1
46	Electrodomésticos	7	2
47	Jardín	7	3
48	Iluminación	7	4
49	Decoración	7	5
50	Bricolaje	7	6
51	Ropa hombre	8	1
52	Ropa mujer	8	2
53	Ropa niño	8	3
54	Calzado	8	4
55	Bolsos y mochilas	8	5
56	Joyería y relojes	8	6
57	Ropa bebé	9	1
58	Carricoches	9	2
59	Juguetes bebé	9	3
60	Mobiliario bebé	9	4
61	Alimentación bebé	9	5
62	Ciclismo	10	1
63	Fitness	10	2
64	Natación	10	3
65	Montaña y escalada	10	4
66	Náutica	10	5
67	Fútbol	10	6
68	Otros deportes	10	7
69	Libros	11	1
70	Música	11	2
71	Coleccionismo	11	3
72	Arte y manualidades	11	4
73	Instrumentos musicales	11	5
74	Fotografía	11	6
75	Perros	12	1
76	Gatos	12	2
77	Aves	12	3
78	Peces y reptiles	12	4
79	Maquinaria agrícola	12	5
80	Plantas y semillas	12	6
81	Reformas y construcción	13	1
82	Limpieza	13	2
83	Clases particulares	13	3
84	Transporte y mudanzas	13	4
85	Otros servicios	13	5
86	Libros de texto	14	1
87	Cursos	14	2
88	Idiomas	14	3
89	Informática y tecnología	14	4
90	Otros libros	14	5
91	Sin categoría	15	1
\.


--
-- Data for Name: trasteros; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.trasteros (id, usuario_id, nombre, ubicacion, created_at) FROM stdin;
1	1	Mi Trastero	\N	2026-04-08 16:54:41.040135
2	3	Doro	\N	2026-04-08 16:54:53.206076
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id, nombre, email, password, avatar_url, created_at, updated_at) FROM stdin;
1	Admin	admin@trastero.com	$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi	https://api.dicebear.com/7.x/avataaars/svg?seed=admin	2026-03-30 17:16:39.464802	2026-03-30 17:16:39.464802
3	Dorian	drobles29@hotmail.com	$2b$10$dsemQXv0b4zDrbpYOQB4/OQEgC/uHBFVcHuo0RIY/DgtjEpDXHi/G	https://api.dicebear.com/7.x/avataaars/svg?seed=Drobles29%40hotmail.com	2026-04-01 17:10:43.751324	2026-04-01 17:10:43.751324
\.


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categorias_id_seq', 15, true);


--
-- Name: imagenes_detalle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.imagenes_detalle_id_seq', 32, true);


--
-- Name: imagenes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.imagenes_id_seq', 101, true);


--
-- Name: preferencias_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.preferencias_usuario_id_seq', 1, false);


--
-- Name: subcategorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.subcategorias_id_seq', 91, true);


--
-- Name: trasteros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trasteros_id_seq', 2, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: categorias categorias_label_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_label_key UNIQUE (label);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: imagenes_detalle imagenes_detalle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes_detalle
    ADD CONSTRAINT imagenes_detalle_pkey PRIMARY KEY (id);


--
-- Name: imagenes imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_pkey PRIMARY KEY (id);


--
-- Name: preferencias_usuario preferencias_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preferencias_usuario
    ADD CONSTRAINT preferencias_usuario_pkey PRIMARY KEY (id);


--
-- Name: preferencias_usuario preferencias_usuario_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preferencias_usuario
    ADD CONSTRAINT preferencias_usuario_usuario_id_key UNIQUE (usuario_id);


--
-- Name: subcategorias subcategorias_categoria_id_label_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_categoria_id_label_key UNIQUE (categoria_id, label);


--
-- Name: subcategorias subcategorias_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_pkey PRIMARY KEY (id);


--
-- Name: trasteros trasteros_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trasteros
    ADD CONSTRAINT trasteros_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: idx_imagenes_detalle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_imagenes_detalle_id ON public.imagenes USING btree (imagenes_detalle_id);


--
-- Name: idx_imagenes_trastero; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_imagenes_trastero ON public.imagenes USING btree (trastero_id);


--
-- Name: idx_imgdetalle_nombre; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_imgdetalle_nombre ON public.imagenes_detalle USING btree (lower((nombre)::text));


--
-- Name: idx_imgdetalle_subcat; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_imgdetalle_subcat ON public.imagenes_detalle USING btree (subcategoria_id);


--
-- Name: idx_imgdetalle_trastero; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_imgdetalle_trastero ON public.imagenes_detalle USING btree (trastero_id);


--
-- Name: idx_subcategorias_cat; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subcategorias_cat ON public.subcategorias USING btree (categoria_id);


--
-- Name: idx_trasteros_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_trasteros_usuario ON public.trasteros USING btree (usuario_id);


--
-- Name: imagenes_detalle imagenes_detalle_subcategoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes_detalle
    ADD CONSTRAINT imagenes_detalle_subcategoria_id_fkey FOREIGN KEY (subcategoria_id) REFERENCES public.subcategorias(id);


--
-- Name: imagenes_detalle imagenes_detalle_trastero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes_detalle
    ADD CONSTRAINT imagenes_detalle_trastero_id_fkey FOREIGN KEY (trastero_id) REFERENCES public.trasteros(id) ON DELETE CASCADE;


--
-- Name: imagenes imagenes_imagenes_detalle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_imagenes_detalle_id_fkey FOREIGN KEY (imagenes_detalle_id) REFERENCES public.imagenes_detalle(id) ON DELETE CASCADE;


--
-- Name: imagenes imagenes_trastero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_trastero_id_fkey FOREIGN KEY (trastero_id) REFERENCES public.trasteros(id) ON DELETE CASCADE;


--
-- Name: preferencias_usuario preferencias_usuario_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preferencias_usuario
    ADD CONSTRAINT preferencias_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: subcategorias subcategorias_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) ON DELETE CASCADE;


--
-- Name: trasteros trasteros_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trasteros
    ADD CONSTRAINT trasteros_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict HoaeQzQqaVjx7qF8jkaMAcJv7MRWEag0sHG3gbxUCwDMI94tUsobwYz3MG8B8vH

