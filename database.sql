PGDMP     :                    |            TodoApp    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16422    TodoApp    DATABASE     �   CREATE DATABASE "TodoApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "TodoApp";
                postgres    false            �            1259    16423    Task    TABLE     �   CREATE TABLE public."Task" (
    id text NOT NULL,
    title text,
    task text,
    date timestamp with time zone,
    completed boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Task";
       public         heap    postgres    false            �          0    16423    Task 
   TABLE DATA           B   COPY public."Task" (id, title, task, date, completed) FROM stdin;
    public          postgres    false    214   s       f           2606    16429    Task Task_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_pkey";
       public            postgres    false    214            �   �   x�}��
�@�����p/�$3�4>G�n����N��R��Y~����rdK�Q���T�W"��k[2���2:t�h�Y+�I�c��<M�-���޸�,�LY�Ѣma���\��]��9Mn[��b�i�{�XwKL5���zDSn��s<�v!��LPW     