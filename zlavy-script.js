javascript:(function () {
    /* 1. Získanie označeného textu na stránke */
    let text = window.getSelection().toString();

    /* 2. Vyhľadanie cien v eurách */
    let najdeneCeny = Array.from(text.matchAll(/(\d+(?:[.,]\d+)?)\s*€/g));
    if (najdeneCeny.length < 2) {
        alert("Označte myšou aspoň obe ceny v €.");
        return;
    }

    /* 3. Vyhľadanie percenta zľavy alebo vyžiadanie od používateľa */
    let najdenePercenta = text.match(/(\d+(?:[.,]\d+)?)\s*%/);
    let percentaText = najdenePercenta 
        ? najdenePercenta[1] 
        : prompt("V označenom texte chýba % zľavy. Zadajte percento zľavy (napr. 20):");

    if (!percentaText) return;

    let uvadzanaZlava = parseFloat(percentaText.replace(',', '.').replace('%', ''));
    if (isNaN(uvadzanaZlava)) {
        alert("Neplatné číslo pre zľavu.");
        return;
    }

    /* 4. Výpočty */
    let ceny = najdeneCeny.map(m => parseFloat(m[1].replace(',', '.')));
    let povodnaCena = Math.max(...ceny);
    let novaCena = Math.min(...ceny);

    let realnaZlava = ((povodnaCena - novaCena) / povodnaCena) * 100;
    let ocakavanaCena = povodnaCena * (1 - uvadzanaZlava / 100);

    /* 5. Vyhodnotenie a výpis */
    let stav = Math.abs(realnaZlava - uvadzanaZlava) <= 1.0 
        ? "✅ SEDÍ (zaokrúhlené)" 
        : "❌ ROZDIEL";

    alert(
        `${stav}\n\n` +
        `Pôvodná cena: ${povodnaCena.toFixed(2)} €\n` +
        `Nová cena: ${novaCena.toFixed(2)} €\n\n` +
        `Zľava na webe: ${uvadzanaZlava}%\n` +
        `Reálna zľava: ${realnaZlava.toFixed(2)}%\n` +
        `(Podľa % zľavy by mala byť cena ${ocakavanaCena.toFixed(2)} €)`
    );
})();
