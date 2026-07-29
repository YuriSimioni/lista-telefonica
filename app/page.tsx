"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  BrushCleaning,
  CircleAlert,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

interface Pessoa {
  nome: string;
  telefone: string;
}

export default function Home() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [listaTelefonica, setListaTelefonica] = useState<Pessoa[]>([]);

  function adicionar_contato() {
    // Validação básica para não adicionar campos vazios
    if (!nome || !telefone) return;

    // 3. Criamos o novo objeto do tipo Pessoa
    const novoContato: Pessoa = {
      nome: nome,
      telefone: telefone,
    };

    // 4. Adicionamos o novo contato à lista existente
    // Usamos o operador spread (...) para manter os contatos anteriores e adicionar o novo
    setListaTelefonica([...listaTelefonica, novoContato]);

    // 5. Limpamos os inputs após adicionar
    setNome("");
    setTelefone("");
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-screen h-screen">
      <Card className="w-1/4 h-fit">
        <CardHeader>
          <CardTitle>Lista Telefônica</CardTitle>
          <CardDescription>
            Cadastre um novo contato em sua lista telefônica
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nome">
                  <User size={20} />
                  Nome
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="João Silva..."
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">
                  <Phone size={20} />
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  type="text"
                  placeholder="(00) 12345-6789"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex-row gap-2">
          <Button type="submit" className="w-1/2" onClick={adicionar_contato}>
            <UserPlus size={20} />
            Cadastrar
          </Button>
          <Button type="reset" className="w-1/2" variant="secondary">
            <BrushCleaning size={20} />
            Limpar
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Contato salvos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {listaTelefonica.length === 0 ? (
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Contato não cadastrados</AlertTitle>
              <AlertDescription>
                Comece cadastrando seu primeiro contato na lista
              </AlertDescription>
            </Alert>
          ) : (
            listaTelefonica.map((pessoa, index) => (
              <Item variant={"outline"} key={index} size="default">
                <ItemContent>
                  <ItemTitle>
                    <User size={16} />
                    {pessoa.nome}
                  </ItemTitle>
                  <ItemDescription>{pessoa.telefone}</ItemDescription>
                </ItemContent>
                {/*<ItemActions>
                  <Button variant="ghost" size="icon-sm">
                    <Copy />
                  </Button>
                </ItemActions>
                */}
              </Item>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
