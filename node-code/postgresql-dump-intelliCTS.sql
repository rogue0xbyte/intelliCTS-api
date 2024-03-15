--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5 (Debian 15.5-0+deb12u1)
-- Dumped by pg_dump version 16.1

-- Started on 2024-03-15 15:06:08

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 843 (class 1247 OID 25157)
-- Name: org_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.org_type AS ENUM (
    'bank',
    'clearing_house'
);


ALTER TYPE public.org_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 25164)
-- Name: cheques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cheques (
    micr text NOT NULL,
    bank_name character varying NOT NULL,
    bank_branch character varying NOT NULL,
    ifsc character varying NOT NULL,
    credit_to character varying NOT NULL,
    signature_image bytea NOT NULL,
    uploaderid integer NOT NULL,
    cheque_no character varying NOT NULL,
    rbi_ac_no character varying NOT NULL,
    txn_code character varying NOT NULL,
    ddmmyyyy character varying NOT NULL,
    status character varying DEFAULT 'scanned'::character varying NOT NULL,
    nonce integer,
    hash character varying,
    previous_hash character varying
);


ALTER TABLE public.cheques OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25199)
-- Name: phase_track; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phase_track (
    micr character varying NOT NULL,
    ifsc character varying NOT NULL,
    cheque_no character varying NOT NULL,
    phase character varying NOT NULL,
    ddmmyyyy character varying NOT NULL,
    actor integer NOT NULL
);


ALTER TABLE public.phase_track OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25148)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    organization_type public.org_type DEFAULT 'bank'::public.org_type NOT NULL,
    password_hash character varying NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 25151)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3210 (class 2604 OID 25152)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3364 (class 0 OID 25164)
-- Dependencies: 216
-- Data for Name: cheques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cheques (micr, bank_name, bank_branch, ifsc, credit_to, signature_image, uploaderid, cheque_no, rbi_ac_no, txn_code, ddmmyyyy, status, nonce, hash, previous_hash) FROM stdin;
004005005	Bank of Tokyo-Mitsubishi UFJ (India)	Chennai Main Branch	BTMU0000001	BCD Corporation	\\x68747470733a2f2f62746d75666a2e636f6d2f7369676e6174757265732f62746d75666a5f7369676e61747572652e706e67	6	456789	039012	2829	26-03-2024	scanned	1	b580f846756f2939ea10e2d7f12c63b114cc001fbc17e09417144e95b6184c53	0
007008008	BNP Paribas (India)	Mumbai Main Branch	BNPA0000001	EFG Corporation	\\x68747470733a2f2f626e70706172696261732e636f6d2f7369676e6174757265732f626e705f7369676e61747572652e706e67	6	234567	048901	3435	29-03-2024	scanned	1	b9233e02e4ea52cfbe256172632aa5ffdb25eaade175ca150fa91004e3cb0747	b580f846756f2939ea10e2d7f12c63b114cc001fbc17e09417144e95b6184c53
008009009	Credit Suisse (India)	Delhi Main Branch	CRSU0000001	FGH Corporation	\\x68747470733a2f2f6372656469747375697373652e636f6d2f7369676e6174757265732f637273755f7369676e61747572652e706e67	6	890123	052345	3637	30-03-2024	scanned	1	ba890674505e2d3a6cd42475700f5542fa05b265e32e60f6815115719a9895ce	b580f846756f2939ea10e2d7f12c63b114cc001fbc17e09417144e95b6184c53
110002002	National Bank of India	Mumbai Main Branch	NBIN0000001	Government of India - Ministry of Finance	\\x68747470733a2f2f6e6174696f6e616c62616e6b6f66696e6469612e636f6d2f7369676e6174757265732f6e62695f7369676e61747572652e706e67	6	123456	001234	123	14-03-2024	scanned	1	4e32aaf8737c0506416246a910f40ef11a8e6f382406180f37b12c666de9f062	b580f846756f2939ea10e2d7f12c63b114cc001fbc17e09417144e95b6184c53
\.


--
-- TOC entry 3365 (class 0 OID 25199)
-- Dependencies: 217
-- Data for Name: phase_track; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phase_track (micr, ifsc, cheque_no, phase, ddmmyyyy, actor) FROM stdin;
004005005	BTMU0000001	456789	scanned	15032024	6
007008008	BNPA0000001	234567	scanned	15032024	6
008009009	CRSU0000001	890123	scanned	15032024	6
110002002	NBIN0000001	123456	scanned	15032024	6
\.


--
-- TOC entry 3362 (class 0 OID 25148)
-- Dependencies: 214
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, organization_type, password_hash, email) FROM stdin;
6	bank	d908850970fcb371d3c33dfdf013970bc92f77333d1e1292c437e99c338aa036	top@sbi.com
\.


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 3216 (class 2606 OID 25205)
-- Name: cheques cheques_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cheques
    ADD CONSTRAINT cheques_pk PRIMARY KEY (ifsc, cheque_no, micr);


--
-- TOC entry 3214 (class 2606 OID 25177)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 25232)
-- Name: phase_track actor_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phase_track
    ADD CONSTRAINT actor_fk FOREIGN KEY (actor) REFERENCES public.users(id);


--
-- TOC entry 3217 (class 2606 OID 25178)
-- Name: cheques fk_uploader_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cheques
    ADD CONSTRAINT fk_uploader_id FOREIGN KEY (uploaderid) REFERENCES public.users(id);


--
-- TOC entry 3219 (class 2606 OID 25222)
-- Name: phase_track phase_track_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phase_track
    ADD CONSTRAINT phase_track_fk FOREIGN KEY (ifsc, cheque_no, micr) REFERENCES public.cheques(ifsc, cheque_no, micr);


-- Completed on 2024-03-15 15:06:12

--
-- PostgreSQL database dump complete
--

