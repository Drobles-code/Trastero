--
-- PostgreSQL database dump
--

\restrict vxdVPjHkht3KRUv6wC5Sz9b8U3CvLbBf5eFZ0IJLkW9uMiEA0Mkv7c0lEiwBhfQ

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
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO postgres;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: imagenes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagenes (
    id integer NOT NULL,
    imagenes_detalle_id integer,
    trastero_id integer,
    ruta character varying(500) NOT NULL,
    posicion integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT imagenes_posicion_check CHECK (((posicion >= 1) AND (posicion <= 4)))
);


ALTER TABLE public.imagenes OWNER TO postgres;

--
-- Name: imagenes_detalle; Type: TABLE; Schema: public; Owner: postgres
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
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.imagenes_detalle OWNER TO postgres;

--
-- Name: imagenes_detalle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagenes_detalle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagenes_detalle_id_seq OWNER TO postgres;

--
-- Name: imagenes_detalle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imagenes_detalle_id_seq OWNED BY public.imagenes_detalle.id;


--
-- Name: imagenes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagenes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagenes_id_seq OWNER TO postgres;

--
-- Name: imagenes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imagenes_id_seq OWNED BY public.imagenes.id;


--
-- Name: preferencias_usuario; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.preferencias_usuario OWNER TO postgres;

--
-- Name: preferencias_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.preferencias_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.preferencias_usuario_id_seq OWNER TO postgres;

--
-- Name: preferencias_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.preferencias_usuario_id_seq OWNED BY public.preferencias_usuario.id;


--
-- Name: trasteros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trasteros (
    id integer NOT NULL,
    usuario_id integer,
    nombre character varying(255) NOT NULL,
    ubicacion character varying(500),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.trasteros OWNER TO postgres;

--
-- Name: trasteros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trasteros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trasteros_id_seq OWNER TO postgres;

--
-- Name: trasteros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trasteros_id_seq OWNED BY public.trasteros.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: imagenes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes ALTER COLUMN id SET DEFAULT nextval('public.imagenes_id_seq'::regclass);


--
-- Name: imagenes_detalle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes_detalle ALTER COLUMN id SET DEFAULT nextval('public.imagenes_detalle_id_seq'::regclass);


--
-- Name: preferencias_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preferencias_usuario ALTER COLUMN id SET DEFAULT nextval('public.preferencias_usuario_id_seq'::regclass);


--
-- Name: trasteros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trasteros ALTER COLUMN id SET DEFAULT nextval('public.trasteros_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id, nombre, descripcion) FROM stdin;
\.


--
-- Data for Name: imagenes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagenes (id, imagenes_detalle_id, trastero_id, ruta, posicion, created_at) FROM stdin;
1	1	1	img-gif/Gif-101TNF18/29194001.jpg	1	2026-04-08 16:54:41.040135
2	1	1	img-gif/Gif-101TNF18/29194002.jpg	2	2026-04-08 16:54:41.040135
3	1	1	img-gif/Gif-101TNF18/29194004.jpg	3	2026-04-08 16:54:41.040135
4	1	1	img-gif/Gif-101TNF18/29194005.jpg	4	2026-04-08 16:54:41.040135
5	2	1	img-gif/Gif-101TNF18/29194006.jpg	1	2026-04-08 16:54:41.040135
6	2	1	img-gif/Gif-101TNF18/29194007.jpg	2	2026-04-08 16:54:41.040135
7	2	1	img-gif/Gif-101TNF18/29194008.jpg	3	2026-04-08 16:54:41.040135
8	2	1	img-gif/Gif-101TNF18/29194009.jpg	4	2026-04-08 16:54:41.040135
9	3	1	img-gif/Gif-101TNF18/2919400e.jpg	1	2026-04-08 16:54:41.040135
10	3	1	img-gif/Gif-101TNF18/29194010.jpg	2	2026-04-08 16:54:41.040135
11	3	1	img-gif/Gif-101TNF18/29194011.jpg	3	2026-04-08 16:54:41.040135
12	3	1	img-gif/Gif-101TNF18/29194012.jpg	4	2026-04-08 16:54:41.040135
13	4	1	img-gif/Gif-101TNF18/29194013.jpg	1	2026-04-08 16:54:41.040135
14	4	1	img-gif/Gif-101TNF18/29194014.jpg	2	2026-04-08 16:54:41.040135
15	4	1	img-gif/Gif-101TNF18/29194015.jpg	3	2026-04-08 16:54:41.040135
16	4	1	img-gif/Gif-101TNF18/29194016.jpg	4	2026-04-08 16:54:41.040135
17	5	1	img-gif/Gif-101TNF18/29194017.jpg	1	2026-04-08 16:54:41.040135
18	5	1	img-gif/Gif-101TNF18/29194018.jpg	2	2026-04-08 16:54:41.040135
19	5	1	img-gif/Gif-101TNF18/29194019.jpg	3	2026-04-08 16:54:41.040135
20	5	1	img-gif/Gif-101TNF18/2919401a.jpg	4	2026-04-08 16:54:41.040135
21	6	1	img-gif/Gif-101TNF18/2919401c.jpg	1	2026-04-08 16:54:41.040135
22	6	1	img-gif/Gif-101TNF18/2919401d.jpg	2	2026-04-08 16:54:41.040135
23	6	1	img-gif/Gif-101TNF18/29194020.jpg	3	2026-04-08 16:54:41.040135
24	6	1	img-gif/Gif-101TNF18/29194021.jpg	4	2026-04-08 16:54:41.040135
25	7	1	img-gif/Gif-101TNF18/29194022.jpg	1	2026-04-08 16:54:41.040135
26	7	1	img-gif/Gif-101TNF18/29194023.jpg	2	2026-04-08 16:54:41.040135
27	7	1	img-gif/Gif-101TNF18/29194024.jpg	3	2026-04-08 16:54:41.040135
28	7	1	img-gif/Gif-101TNF18/29194025.jpg	4	2026-04-08 16:54:41.040135
29	8	1	img-gif/Gif-101TNF18/29194029.jpg	1	2026-04-08 16:54:41.040135
30	8	1	img-gif/Gif-101TNF18/2919402a.jpg	2	2026-04-08 16:54:41.040135
31	8	1	img-gif/Gif-101TNF18/2919402d.jpg	3	2026-04-08 16:54:41.040135
32	8	1	img-gif/Gif-101TNF18/2919402e.jpg	4	2026-04-08 16:54:41.040135
33	9	1	img-gif/Gif-101TNF18/2919402f.jpg	1	2026-04-08 16:54:41.040135
34	9	1	img-gif/Gif-101TNF18/29194030.jpg	2	2026-04-08 16:54:41.040135
35	9	1	img-gif/Gif-101TNF18/29194031.jpg	3	2026-04-08 16:54:41.040135
36	9	1	img-gif/Gif-101TNF18/29194032.jpg	4	2026-04-08 16:54:41.040135
37	10	1	img-gif/Gif-101TNF18/29194033.jpg	1	2026-04-08 16:54:41.040135
38	10	1	img-gif/Gif-101TNF18/29194034.jpg	2	2026-04-08 16:54:41.040135
39	10	1	img-gif/Gif-101TNF18/29194035.jpg	3	2026-04-08 16:54:41.040135
40	10	1	img-gif/Gif-101TNF18/29194036.jpg	4	2026-04-08 16:54:41.040135
41	11	1	img-gif/Gif-101TNF18/29194037.jpg	1	2026-04-08 16:54:41.040135
42	11	1	img-gif/Gif-101TNF18/29194038.jpg	2	2026-04-08 16:54:41.040135
43	11	1	img-gif/Gif-101TNF18/29194039.jpg	3	2026-04-08 16:54:41.040135
44	11	1	img-gif/Gif-101TNF18/2919403a.jpg	4	2026-04-08 16:54:41.040135
45	12	1	img-gif/Gif-101TNF18/2919403b.jpg	1	2026-04-08 16:54:41.040135
46	12	1	img-gif/Gif-101TNF18/2919403c.jpg	2	2026-04-08 16:54:41.040135
47	12	1	img-gif/Gif-101TNF18/2919403d.jpg	3	2026-04-08 16:54:41.040135
48	12	1	img-gif/Gif-101TNF18/2919403e.jpg	4	2026-04-08 16:54:41.040135
49	13	1	img-gif/Gif-101TNF18/2919403f.jpg	1	2026-04-08 16:54:41.040135
50	13	1	img-gif/Gif-101TNF18/29194040.jpg	2	2026-04-08 16:54:41.040135
51	13	1	img-gif/Gif-101TNF18/29194041.jpg	3	2026-04-08 16:54:41.040135
52	13	1	img-gif/Gif-101TNF18/29194042.jpg	4	2026-04-08 16:54:41.040135
53	14	1	img-gif/Gif-101TNF18/29194043.jpg	1	2026-04-08 16:54:41.040135
54	14	1	img-gif/Gif-101TNF18/29194044.jpg	2	2026-04-08 16:54:41.040135
55	14	1	img-gif/Gif-101TNF18/29194045.jpg	3	2026-04-08 16:54:41.040135
56	14	1	img-gif/Gif-101TNF18/29194046.jpg	4	2026-04-08 16:54:41.040135
57	15	1	img-gif/Gif-101TNF18/29194047.jpg	1	2026-04-08 16:54:41.040135
58	15	1	img-gif/Gif-101TNF18/29194048.jpg	2	2026-04-08 16:54:41.040135
59	15	1	img-gif/Gif-101TNF18/29194049.jpg	3	2026-04-08 16:54:41.040135
60	15	1	img-gif/Gif-101TNF18/2919404a.jpg	4	2026-04-08 16:54:41.040135
61	16	1	img-gif/Gif-101TNF18/2919404b.jpg	1	2026-04-08 16:54:41.040135
62	16	1	img-gif/Gif-101TNF18/2919404c.jpg	2	2026-04-08 16:54:41.040135
63	16	1	img-gif/Gif-101TNF18/2919404d.jpg	3	2026-04-08 16:54:41.040135
64	16	1	img-gif/Gif-101TNF18/2919404e.jpg	4	2026-04-08 16:54:41.040135
65	17	1	img-gif/Gif-101TNF18/2919404f.jpg	1	2026-04-08 16:54:41.040135
66	17	1	img-gif/Gif-101TNF18/29194050.jpg	2	2026-04-08 16:54:41.040135
67	17	1	img-gif/Gif-101TNF18/29194051.jpg	3	2026-04-08 16:54:41.040135
68	17	1	img-gif/Gif-101TNF18/29194052.jpg	4	2026-04-08 16:54:41.040135
69	18	1	img-gif/Gif-101TNF18/29194053.jpg	1	2026-04-08 16:54:41.040135
70	18	1	img-gif/Gif-101TNF18/29194054.jpg	2	2026-04-08 16:54:41.040135
71	18	1	img-gif/Gif-101TNF18/29194055.jpg	3	2026-04-08 16:54:41.040135
72	18	1	img-gif/Gif-101TNF18/29194056.jpg	4	2026-04-08 16:54:41.040135
73	19	1	img-gif/Gif-101TNF18/29194057.jpg	1	2026-04-08 16:54:41.040135
74	19	1	img-gif/Gif-101TNF18/29194058.jpg	2	2026-04-08 16:54:41.040135
75	19	1	img-gif/Gif-101TNF18/29194059.jpg	3	2026-04-08 16:54:41.040135
76	19	1	img-gif/Gif-101TNF18/2919405a.jpg	4	2026-04-08 16:54:41.040135
77	20	1	img-gif/Gif-101TNF18/2919405b.jpg	1	2026-04-08 16:54:41.040135
78	20	1	img-gif/Gif-101TNF18/2919405c.jpg	2	2026-04-08 16:54:41.040135
79	20	1	img-gif/Gif-101TNF18/2919405d.jpg	3	2026-04-08 16:54:41.040135
80	20	1	img-gif/Gif-101TNF18/2919405e.jpg	4	2026-04-08 16:54:41.040135
81	21	1	img-gif/Gif-101TNF18/2919405f.jpg	1	2026-04-08 16:54:41.040135
82	21	1	img-gif/Gif-101TNF18/29194060.jpg	2	2026-04-08 16:54:41.040135
83	21	1	img-gif/Gif-101TNF18/29194061.jpg	3	2026-04-08 16:54:41.040135
84	21	1	img-gif/Gif-101TNF18/29194062.jpg	4	2026-04-08 16:54:41.040135
85	22	1	img-gif/Gif-101TNF18/29194063.jpg	1	2026-04-08 16:54:41.040135
86	22	1	img-gif/Gif-101TNF18/29194064.jpg	2	2026-04-08 16:54:41.040135
87	22	1	img-gif/Gif-101TNF18/29194065.jpg	3	2026-04-08 16:54:41.040135
88	22	1	img-gif/Gif-101TNF18/29194066.jpg	4	2026-04-08 16:54:41.040135
89	23	1	img-gif/Gif-101TNF18/29194067.jpg	1	2026-04-08 16:54:41.040135
90	23	1	img-gif/Gif-101TNF18/29194068.jpg	2	2026-04-08 16:54:41.040135
91	23	1	img-gif/Gif-101TNF18/29194069.jpg	3	2026-04-08 16:54:41.040135
92	23	1	img-gif/Gif-101TNF18/2919406a.jpg	4	2026-04-08 16:54:41.040135
93	24	2	http://localhost:5000/uploads/3/1775663693154-kbedgazbp8f.jpeg	1	2026-04-08 16:54:53.211284
94	24	2	http://localhost:5000/uploads/3/1775663693154-rkx0ys9exjo.jpeg	2	2026-04-08 16:54:53.21945
95	24	2	http://localhost:5000/uploads/3/1775663693156-ocx1lzftxw.jpeg	3	2026-04-08 16:54:53.220221
\.


--
-- Data for Name: imagenes_detalle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagenes_detalle (id, trastero_id, nombre, descripcion, precio, negociable, acepta_cambio, categoria, subcategoria, km, anio, combustible, cv, metros, habitaciones, banos, created_at, updated_at) FROM stdin;
1	1	flor	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
2	1	lapto	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
3	1	cafe	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
4	1	car	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
5	1	casa	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
6	1	arbol	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
7	1	Tu trastero07	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
8	1	Tu trastero08	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
9	1	Tu trastero09	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
10	1	Tu trastero10	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
11	1	Tu trastero11	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
12	1	Tu trastero12	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
13	1	Tu trastero13	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
14	1	Tu trastero14	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
15	1	Tu trastero15	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
16	1	Tu trastero16	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
17	1	Tu trastero17	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
18	1	Tu trastero18	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
19	1	Tu trastero19	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
20	1	Tu trastero20	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
21	1	Tu trastero21	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
22	1	Tu trastero22	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
23	1	Tu trastero23	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-04-08 16:54:41.040135	2026-04-08 16:54:41.040135
24	2	CENTRALITA	Centralita Ecosport 2.0 Xlt 2007	1500.00	t	t	Motor	Coches	187000	2007	Gasolina	140	\N	\N	\N	2026-04-08 16:54:53.209943	2026-04-08 16:56:12.261038
\.


--
-- Data for Name: preferencias_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.preferencias_usuario (id, usuario_id, bg_color, text_color, accent_color, modal_color, card_title, navbar_color, updated_at) FROM stdin;
\.


--
-- Data for Name: trasteros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trasteros (id, usuario_id, nombre, ubicacion, created_at) FROM stdin;
1	1	Mi Trastero	\N	2026-04-08 16:54:41.040135
2	3	Mi Trastero	\N	2026-04-08 16:54:53.206076
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, avatar_url, created_at, updated_at) FROM stdin;
1	Admin	admin@trastero.com	$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi	https://api.dicebear.com/7.x/avataaars/svg?seed=admin	2026-03-30 17:16:39.464802	2026-03-30 17:16:39.464802
3	Dorian	drobles29@hotmail.com	$2b$10$dsemQXv0b4zDrbpYOQB4/OQEgC/uHBFVcHuo0RIY/DgtjEpDXHi/G	https://api.dicebear.com/7.x/avataaars/svg?seed=Drobles29%40hotmail.com	2026-04-01 17:10:43.751324	2026-04-01 17:10:43.751324
\.


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_seq', 1, false);


--
-- Name: imagenes_detalle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagenes_detalle_id_seq', 24, true);


--
-- Name: imagenes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagenes_id_seq', 95, true);


--
-- Name: preferencias_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.preferencias_usuario_id_seq', 1, false);


--
-- Name: trasteros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trasteros_id_seq', 2, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: categorias categorias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: imagenes_detalle imagenes_detalle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes_detalle
    ADD CONSTRAINT imagenes_detalle_pkey PRIMARY KEY (id);


--
-- Name: imagenes imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_pkey PRIMARY KEY (id);


--
-- Name: preferencias_usuario preferencias_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preferencias_usuario
    ADD CONSTRAINT preferencias_usuario_pkey PRIMARY KEY (id);


--
-- Name: preferencias_usuario preferencias_usuario_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preferencias_usuario
    ADD CONSTRAINT preferencias_usuario_usuario_id_key UNIQUE (usuario_id);


--
-- Name: trasteros trasteros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trasteros
    ADD CONSTRAINT trasteros_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: idx_imagenes_detalle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_imagenes_detalle_id ON public.imagenes USING btree (imagenes_detalle_id);


--
-- Name: idx_imagenes_trastero; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_imagenes_trastero ON public.imagenes USING btree (trastero_id);


--
-- Name: idx_imgdetalle_nombre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_imgdetalle_nombre ON public.imagenes_detalle USING btree (lower((nombre)::text));


--
-- Name: idx_imgdetalle_trastero; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_imgdetalle_trastero ON public.imagenes_detalle USING btree (trastero_id);


--
-- Name: idx_trasteros_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_trasteros_usuario ON public.trasteros USING btree (usuario_id);


--
-- Name: imagenes_detalle imagenes_detalle_trastero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes_detalle
    ADD CONSTRAINT imagenes_detalle_trastero_id_fkey FOREIGN KEY (trastero_id) REFERENCES public.trasteros(id) ON DELETE CASCADE;


--
-- Name: imagenes imagenes_imagenes_detalle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_imagenes_detalle_id_fkey FOREIGN KEY (imagenes_detalle_id) REFERENCES public.imagenes_detalle(id) ON DELETE CASCADE;


--
-- Name: imagenes imagenes_trastero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_trastero_id_fkey FOREIGN KEY (trastero_id) REFERENCES public.trasteros(id) ON DELETE CASCADE;


--
-- Name: preferencias_usuario preferencias_usuario_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preferencias_usuario
    ADD CONSTRAINT preferencias_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: trasteros trasteros_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trasteros
    ADD CONSTRAINT trasteros_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict vxdVPjHkht3KRUv6wC5Sz9b8U3CvLbBf5eFZ0IJLkW9uMiEA0Mkv7c0lEiwBhfQ

