import React from 'react';
import { useSelector } from 'react-redux';

const Agb = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const text = settings[0]?.color[0]?.textColor;
  return (
    <div className='min-h-screen bg-gray-700 py-8 select-none'>
      <div class='max-w-md mx-auto rounded-lg md:max-w-5xl'>
        <div class='md:flex '>
          <div class='w-full'>
            <div className=' bg-gray-800 p-6 rounded shadow-2xl '>
              <h2 class={`text-3xl font-bold mb-8 ${text} text-center`}>
                Allgemeine Geschäftsbedingungen
              </h2>
              <div className='text-white pl-4 pt-4 font-light'>
                <div>
                  <div className='font-bold text-xl'>
                    I. Allgemeine Bedingungen
                  </div>
                  <p>
                    1. Die vorliegenden allgemeinen Bedingungen gelten für alle
                    Verträge, die mit dem Restaurant {settings[0]?.brand}
                    abgeschlossen werden, sofern sie die Merkmale der AGB
                    erfüllen. Die AGBs gelten für alle Lieferungen/ Abholungen
                    zwischen uns und einem Besteller in ihrer zum Zeitpunkt der
                    Bestellung gültigen Fassung. Besteller ist jede natürliche
                    Person, die ein Rechtsgeschäft zu Zwecken abschließt, die
                    überwiegend weder ihrer gewerblichen noch ihrer
                    selbständigen beruflichen Tätigkeit zugerechnet werden
                    können (§ 13 BGB).
                  </p>
                  <p>
                    2. Sämtliche Preisauszeichnungen und -vereinbarungen
                    verstehen sich in EURO (EUR / €). Sollten sich die Preise
                    aufgrund von saisonalen Schwankungen stark verändern oder es
                    zu großen Preisschwankungen im Einkauf, beispielsweise durch
                    Knappheit kommt, behalten wir uns das Recht vor, unsere
                    Preise entsprechend nach zu kalkulieren.
                  </p>
                </div>
                <div>
                  <div className='font-bold text-xl'>
                    II. Lieferung, Auslieferungsgebiet & Abhloung
                  </div>
                  <p>
                    1. Die Lieferung von Waren ist auf das von{' '}
                    {settings[0]?.brand}
                    bestimmte Auslieferungsgebiet beschränkt. Dem Nutzer werden
                    bestehende Auslieferbeschränkungen spätestens bei Beginn des
                    Bestellvorgangs klar und deutlich mitgeteilt.
                  </p>
                  <p>
                    2. Die Lieferzeit hängt stark von der Tageszeit,
                    Bestellaufkommen und der Lieferentfernung ab. Soweit nicht
                    bei der Bestellung auf eine besondere Lieferdauer
                    hingewiesen wird, beträgt die Lieferzeit ab Eingang der
                    Bestellbestätigung beim Kunden üblicherweise nicht mehr als
                    90 Minuten.
                  </p>
                  <p>
                    3. Die Abholung in den Geschäftsräumen von{' '}
                    {settings[0]?.brand} kann je nach Einzelheiten der
                    Bestellung variieren.
                  </p>
                </div>
                <div>
                  <div className='font-bold text-xl'>
                    III. Vertragsabschluss
                  </div>
                  <p>
                    1. Das Einstellen von Produkten auf die Webseite stellt noch
                    kein verbindliches Angebot seitens {settings[0]?.brand} dar,
                    sondern ist lediglich eine Aufforderung an den Kunden,
                    seinerseits ein Angebot abzugeben.
                  </p>
                  <p>
                    2. Ein verbindliches Angebot, das auf den Abschluss eines
                    Kaufvertrages gerichtet ist, liegt im Absenden der
                    Bestellung durch den Kunden durch Betätigung der dafür
                    vorgesehenen „Mit Bargeld / PayPal zahlen“-Schaltfläche auf
                    der „Warenkorb“-Seite und erstreckt sich auf alle Produkte,
                    die vom Nutzer zu seinem individuellen, virtuellen Warenkorb
                    zugeordnet sind.
                  </p>
                  <p>
                    3. Der Nutzer hat seine Daten vor dem Absenden eine
                    verbindlichen Bestellung zu überprüfen und ggf. zu
                    korrigieren. Der Nutzer ist verpflichtet für die
                    ordnungsgemäße Abwicklung der Bestellung die erforderlichen
                    Angaben wahrheitsgemäß, gewissenhaft und vollständig
                    hinsichtlich der Zahlungsdaten und E-Mail-Adresse und im
                    Falle einer Lieferung der Lieferadresse und Telefonnummer zu
                    machen.
                  </p>
                  <p>
                    4. Der Nutzer erhält unverzüglich nach Eingang des Angebots
                    zur Lieferung oder Abholung von Waren eine Bestätigung über
                    den Erhalt des Angebots per E-Mail.
                  </p>
                  <p>
                    5. Die Annahme des Vertragsangebotes erfolgt, indem{' '}
                    {settings[0]?.brand} dem Kunden per E-Mail die Annahme
                    erklärt oder die Ware überreicht, bereitstellt bzw.
                    versendet.
                  </p>
                  <p>
                    6. {settings[0]?.brand} kann die Annahme des
                    Vertragsangebotes im Einzelfall (z.B. bei Verdacht auf eine
                    missbräuchlichen Bestellung, PayPal Kontomissbrauch, Adresse
                    außerhalb des Liefergebiets) ohne Angabe von Gründen
                    verweigern.
                  </p>
                  <p>
                    7. Bei der Auslieferung / Übergabe von Waren die einer
                    Alters-Identifizierung unterliegen, kann seitens{' '}
                    {settings[0]?.brand} eine Verifizierung des Nutzers
                    durchgeführt werden. Kann der Nutzer sich nicht entsprechend
                    verifizieren, kann {settings[0]?.brand} die Lieferung /
                    Übergabe der Ware an den Nutzer verweigern.
                  </p>
                </div>
                <div>
                  <div className='font-bold text-xl'>
                    IV. Angaben zu Preisen und Versandkosten, Zahlung
                  </div>
                  <p>
                    1. Der Nutzer zahlt den Kaufpreis per Bargeld oder einer zur
                    Verfügungstehnden Online-Zahlungsmethode an{' '}
                    {settings[0]?.brand}
                  </p>
                  <p>
                    2. Alle Preisangaben sind Bruttopreise (inkl. gesetzlicher
                    Mehrwertsteuer). Zusätzlich zum Produktpreis anfallende
                    Kosten für die Lieferung werden dem Kunden unmittelbar bevor
                    er seine Bestellung aufgibt deutlich mitgeteilt.
                  </p>
                  <p>
                    3. {settings[0]?.brand}, entscheidet darüber, welche
                    Zahlungsmethoden dem Nutzer zur Zahlungsabwicklung angeboten
                    werden. Die Zahlungsmethoden werden dem Kunden spätestens
                    bei Beginn des Bestellvorgangs klar und deutlich mitgeteilt
                    und diesem zur Auswahl gestellt. Die Zahlungsweise wird
                    verbindlich beim Bestellvorgang durch den Nutzer ausgewählt.
                  </p>
                </div>
                <div>
                  <div className='font-bold text-xl'>V. Widerrufsrecht</div>
                  <p>
                    1. Dem Nutzer, der Verbraucher im Sinne von § 13 des
                    Bürgerlichen Gesetzbuches ist, steht unter gesetzlich
                    definierten Bedingungen ein Widerrufsrecht gegenüber{' '}
                    {settings[0]?.brand} zu. Einzelheiten sind unter 4.
                    einsehbar.
                  </p>
                  <p>
                    2. Das Widerrufsrecht besteht nicht, bei der Bestellung von
                    Speisen, weil diese individuell für den Kunden zubereitet
                    werden, § 312g Abs.2 S. 1 Nr. 1 BGB. Bei Verträgen zur
                    Lieferung von Speisen, die schnell verderben können oder
                    deren Haltbarkeitsdatum schnell überschritten würde, § 312g
                    Abs.2 S. 1 Nr. 2 BGB. Bei sonstigen Produkten, insbesondere
                    Getränken, wenn die Versiegelung entfernt wurde, § 312g Abs.
                    2 Nr.3 BGB.
                  </p>
                  <p>
                    3. Ein etwaig bestehendes gesetzliches Widerrufsrecht
                    erlischt, wenn die Anbieterin die vom Kunden beauftragte
                    Dienstleistungen vollständig erbracht hat und mit der
                    Ausführung erst begonnen hat, nachdem der Kunde dazu seine
                    ausdrückliche Zustimmung gegeben hat, dass er sein
                    Widerrufsrecht bei vollständiger Vertragserfüllung die
                    Anbieterin verliert, soweit die Zustimmung auf einem
                    dauerhaften Datenträger übermittelt worden ist.
                  </p>
                  <p>
                    4. Widerrufsrecht: Sie haben das Recht, binnen 14 Tagen ohne
                    Angabe von Gründen diesen Vertrag zu widerrufen.
                  </p>
                  <p>
                    {' '}
                    Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie
                    oder ein von Ihnen benannter Dritter, der nicht der
                    Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
                  </p>
                  <p>
                    Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
                    (Kontaktdaten: {settings[0]?.brand} {settings[0]?.street}{' '}
                    {settings[0]?.streetNumber}, {settings[0]?.zipCode}
                    {settings[0]?.city}, Tel.: {settings[0]?.telefon}, E-Mail:{' '}
                    {settings[0]?.email}) mittels einer eindeutigen Erklärung
                    (z. B. ein mit der Post versandter Brief, E-Mail oder
                    Telefon) über Ihren Entschluss, diesen Vertrag zu
                    widerrufen, informieren. Sie können dafür das beigefügte
                    Muster-Widerrufsformular verwenden, das jedoch nicht
                    vorgeschrieben ist.
                  </p>
                  <p>
                    Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
                    Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf
                    der Widerrufsfrist absenden.
                  </p>
                  <p>Folgen des Widerrufs</p>
                  <p>
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                    Zahlungen, die wir von Ihnen erhalten haben, einschließlich
                    der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die
                    sich daraus ergeben, dass Sie eine andere Art der Lieferung
                    als die von uns angebotene, günstigste Standardlieferung
                    gewählt haben) unverzüglich und spätestens binnen 14 Tagen
                    ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren
                    Widerruf dieses Vertrages bei uns eingegangen ist.
                  </p>
                  <p>
                    Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel,
                    das Sie bei der ursprünglichen Transaktion eingesetzt haben,
                    es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
                    vereinbart; in keinem Fall werden Ihnen wegen dieser
                    Rückzahlung Entgelte berechnet. Wir können die Rückzahlung
                    verweigern, bis wir die Waren wieder zurückerhalten haben
                    oder bis Sie den Nachweis erbracht, dass Sie die Waren
                    zurückgesandt haben, je nachdem welches der frühere
                    Zeitpunkt ist.
                  </p>
                  <p>
                    Sie haben die Waren unverzüglich und in jedem Fall
                    spätestens binnen 14 Tagen ab dem Tag, an dem Sie uns über
                    den Widerruf dieses Vertrags unterrichten an uns
                    zurückzusenden oder zu übergeben. Die Frist ist gewahrt,
                    wenn Sie die Waren vor Ablauf der Frist von 14 Tagen
                    absenden. Sie tragen die unmittelbaren Kosten der
                    Rücksendung der Waren. Sie müssen für einen etwaigen
                    Wertverlust nur aufkommen, wenn dieser Wertverlust auf einen
                    zur Prüfung der Beschaffenheit, Eigenschaften und
                    Funktionsweise der Waren nicht notwendigen Umgang mit Ihnen
                    zurückzuführen ist.
                  </p>
                  <p>Muster-Widerrufsformular</p>
                  <p>
                    (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie
                    bitte dieses Formular aus und senden Sie es zurück.)
                  </p>
                  <p>
                    An
                    <div>{settings[0]?.brand}</div>
                    <div className='flex'>
                      <div className='pr-1'>{settings[0]?.street}</div>
                      <div>{settings[0]?.streetNumber}</div>
                    </div>
                    <div className='flex'>
                      <div className='pr-1'>{settings[0]?.zipCode}</div>
                      <div>{settings[0]?.city}</div>
                    </div>
                    <p>
                      Hiermit widerrufe ich (*) den von mir (*) abgeschlossenen
                      Vertrag über den Kauf der folgenden Waren (*)/die
                      Erbringung der folgenden Dienstleistung (*)
                    </p>
                    <p>Bestellt am (*)/erhalten am (*):</p>
                    <p>Bestellnummer</p>
                    <p>Name des Verbrauchers:</p>
                    <p>Anschrift des Verbrauchers:</p>
                    <div className='flex'>
                      <p className='pr-20'>Datum:</p>
                      <p>Unterschrift:</p>
                    </div>
                    <p>(*) Unzutreffendes streichen.</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agb;
