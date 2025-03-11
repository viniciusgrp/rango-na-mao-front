import Image from "next/image";
import Logo from "../../../public/logo.jpg";
import { Icon, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export const LojaHeader = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <header className="flex items-center bg-black p-4">
      <Image src={Logo} alt="Logo" className="w-[100px] h-[100px]" />
      <div className="flex flex-col gap-1 ml-2.5">
        <Typography variant="h5" className="text-white">
          Burger Burguer&apos;s
        </Typography>
        <Typography variant="body1" className="text-white">
          O melhor hambúrguer da cidade
        </Typography>
      </div>
      {isMobile ? (
        <>
          <Icon
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              height: 34,
              width: 34,
            }}
          >
            <MenuIcon htmlColor="#FFFFFF" style={{ fontSize: 34 }} />
          </Icon>
          <Menu onClose={() => setAnchorEl(null)} open={!!anchorEl} anchorEl={anchorEl}>
            <MenuItem style={{width: "50vw"}}>Entrar</MenuItem>
            <MenuItem>Cadastrar</MenuItem>
          </Menu>
        </>
      ) : (
        <div style={{ position: "absolute", right: 30, top: 30 }}>
          <Typography
            variant="body1"
            className="flex align-center text-white gap-1 cursor-pointer"
          >
            <AccountCircleIcon /> Entre ou Cadastre-se
          </Typography>
        </div>
      )}
    </header>
  );
};
