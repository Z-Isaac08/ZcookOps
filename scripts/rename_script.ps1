# 1. Définir le chemin du dossier (remplace par ton dossier ou utilise "." pour le dossier courant)
$dossier = "."

# 2. Récupérer les fichiers du dossier
Get-ChildItem -Path $dossier -File | ForEach-Object {
    
    # Vérifie si le fichier commence par "Pasted image " suivi de la date (14 chiffres)
    if ($_.BaseName -match "^Pasted image \d{14}$") {
        
        # Remplace les espaces par des tirets dans le nom du fichier
        $nouveauNom = $_.Name -replace " ", "-"
        
        # Renommer le fichier
        Rename-Item -Path $_.FullName -NewName $nouveauNom -Verbose
    }
}