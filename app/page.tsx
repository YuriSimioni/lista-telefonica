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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  BrushCleaning,
  Check,
  CircleAlert,
  Phone,
  Trash,
  Trash2,
  User,
  UserPlus,
  UserX,
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
  
  const [sucesso, setSucesso] = useState(false);

  function adicionar_contato() {
    if (!nome || !telefone) return;

    const novoContato: Pessoa = {
      nome: nome,
      telefone: telefone,
    };

    setListaTelefonica([...listaTelefonica, novoContato]);
    
    setSucesso(true);

    setTimeout(() => {
      setSucesso(false);
    }, 3000);

    setNome("");
    setTelefone("");
  }

  function deleta_contato(telefoneParaDeletar: string) {
    if (!telefoneParaDeletar) return;

    // CORREÇÃO: Usar setListaTelefonica para atualizar o estado do React corretamente
    setListaTelefonica(prevLista => prevLista.filter(pessoa => pessoa.telefone !== telefoneParaDeletar));
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nome">
                  <User size={20} />
                  Nome
                </Label>
                <Input
                  id="nome" type="text" placeholder="João Silva..." value={nome} onChange={(e) => setNome(e.target.value)} required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">
                  <Phone size={20} />
                  Telefone
                </Label>
                <Input
                  id="telefone" type="text" placeholder="(00) 12345-6789" value={telefone} onChange={(e) => setTelefone(e.target.value)} required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full flex-row gap-2">
          <Button type="button" className="w-1/2" onClick={adicionar_contato}>
            <UserPlus size={20} />
            Cadastrar
          </Button>
          <Button type="reset" className="w-1/2" variant="secondary" onClick={() => { setNome(""); setTelefone(""); }}>
            <BrushCleaning size={20} />
            Limpar
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Contatos salvos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {listaTelefonica.length === 0 ? (
            <Alert variant="default">
              <CircleAlert />
              <AlertTitle>Contato não cadastrados</AlertTitle>
              <AlertDescription>
                Comece cadastrando seu primeiro contato na lista
              </AlertDescription>
            </Alert>
          ) : (
            listaTelefonica.map((pessoa, index) => {
              return (
                <Item variant={"outline"} key={index} size="default">
                  <ItemContent>
                    <ItemTitle>
                      <User size={16} />
                      {pessoa.nome}
                    </ItemTitle>
                    <ItemDescription>{pessoa.telefone}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    {/* CORREÇÃO: Adicionado o onClick chamando a função com o telefone */}
                    <Dialog>
                      <DialogTrigger render={<Button variant={"outline"}><Trash2></Trash2></Button>}></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className='flex gap-3 items-center'>
                            <UserX size={18}/>
                            Excluir contato
                          </DialogTitle>
                          <DialogDescription>
                            Deseja realmente excluir o contato: <strong>{pessoa.nome}</strong>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline">Cancel</Button>} />
                          <Button variant="destructive" onClick={() => {
                            deleta_contato(pessoa.telefone)
                          }}>Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </ItemActions>
                </Item>
              );
            })
          )}
        </CardContent>
      </Card>
      {sucesso && (
        <Alert className="w-fit absolute bottom-10 right-10">
          <Check/>
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>Contato cadastrado com sucesso.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}