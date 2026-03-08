"use client";

import React from "react";
import Image from "next/image"; // Si usas Next.js, si no usa <img />
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, CalendarDays, ClipboardCheck, FileSearch2, FileText, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// --- ESQUEMA DE VALIDACIÓN CON ZOD ---
// Esto define las reglas para el formulario (email válido, contraseña no vacía)
const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, ingresa un correo electrónico válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

// Extraemos el tipo de TypeScript del esquema
type LoginFormValues = z.infer<typeof loginSchema>;

const EmployerMedicalPortal: React.FC = () => {
  // --- INICIALIZACIÓN DE REACT HOOK FORM ---
  const form = useForm<LoginFormValues>({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // --- FUNCIÓN AL ENVIAR EL FORMULARIO ---
  const onSubmit = (data: LoginFormValues) => {
    console.log("Datos enviados:", data);
    // Aquí iría tu lógica de autenticación
    alert("Iniciando sesión con: " + data.email);
  };

  return (
    // Contenedor principal para centrar la tarjeta en la pantalla
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EDF2F7] p-4 md:p-10 font-sans">
      <Card className="w-full max-w-[1200px] shadow-2xl rounded-3xl overflow-hidden border-none grid md:grid-cols-[2fr,1.5fr] ">
        
        {/* --- PANEL IZQUIERDO: DEGRADADO Y CARACTERÍSTICAS --- */}
        {/* Usamos grid-cols-[2fr,1.5fr] para dar más espacio a este panel */}
        <div className="bg-gradient-to-b from-[#1875EA] to-[#0A3D7A] p-10 md:p-16 flex flex-col relative text-white ">
          
          {/* Elementos decorativos (círculos borrosos opcionales) */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col flex-grow">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-12">
              Employer<br />
              Medical Portal
            </h1>

            {/* Lista de Características con iconos de Lucide */}
            <ul className="space-y-6 text-blue-100 text-lg">
              {[
                { icon: FileSearch2, text: "Data Analytics" },
                { icon: CalendarDays, text: "Online Scheduling" },
                { icon: ClipboardCheck, text: "Resulting" },
                { icon: BriefcaseBusiness, text: "OSHA Surveillance" },
                { icon: FileText, text: "Invoicing" },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- PANEL DERECHO: FORMULARIO DE LOGIN --- */}
        <div className="bg-white p-10 md:p-16 flex flex-col">
          
          {/* Cabecera: Logo y Botón de Registro */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              {/* Reemplaza con tu logo real */}
              <BriefcaseBusiness className="w-7 h-7 text-[#1875EA]" />
              <span className="text-2xl font-semibold text-[#1F2937]">SYNCHROMEDICS</span>
            </div>
            <Button variant="outline" className="text-sm border-[#1875EA] text-[#1875EA] hover:bg-blue-50 rounded-full px-6">
              REGISTER
            </Button>
          </div>

          {/* Formulario de Login */}
          <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-10">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Pestañas de tipo de cuenta */}
              <Tabs defaultValue="business" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#F3F4F6] p-1 h-14 rounded-full">
                  <TabsTrigger value="business" className="flex items-center gap-3 h-full rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md text-[#6B7280] data-[state=active]:text-[#1F2937]">
                    <BriefcaseBusiness className="w-5 h-5" />
                    <span className="font-medium text-base">Business Login</span>
                  </TabsTrigger>
                  <TabsTrigger value="clinic" className="flex items-center gap-3 h-full rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md text-[#6B7280] data-[state=active]:text-[#1F2937]">
                    <LockKeyhole className="w-5 h-5" />
                    <span className="font-medium text-base">Clinic Login</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Campo Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base text-[#6B7280]">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ymaiel@mail.com"
                    className={`h-14 pl-12 pr-4 bg-[#F9FAFB] border-none rounded-xl text-lg placeholder:text-[#A1A7B3] ${errors.email ? "border-2 border-red-500 bg-red-50" : ""}`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base text-[#6B7280]">Password</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className={`h-14 pl-12 pr-4 bg-[#F9FAFB] border-none rounded-xl text-lg placeholder:text-[#A1A7B3] ${errors.password ? "border-2 border-red-500 bg-red-50" : ""}`}
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Botón de Enviar */}
              <Button type="submit" className="w-full h-14 bg-[#1875EA] hover:bg-[#1565C0] text-lg font-semibold rounded-full shadow-lg shadow-blue-500/30">
                LOGIN
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmployerMedicalPortal;