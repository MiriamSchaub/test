function submitQuiz() {
    var form = document.getElementById('quiz-form');
    var resultContainer = document.getElementById('result');
    
    var blockPoints = {
        '„Sei beliebt!“': {
            total: 0,
            maxPossiblePoints: 15
        },
        '„Sei perfekt!“': {
            total: 0,
            maxPossiblePoints: 15
        },
        '„Sei selbstständig!“': {
            total: 0,
            maxPossiblePoints: 15
        },
        '„Sei effizient!“': {
            total: 0,
            maxPossiblePoints: 15
        }
    };

    function calculateBlockPoints(blockName, questionIndices) {
        var blockTotal = 0;
        questionIndices.forEach(function(index) {
            var answer = form.elements['q' + index];
            if (answer && answer.value !== "") {
                var selectedValue = parseInt(answer.value);
                blockTotal += selectedValue;
            }
        });
        blockPoints[blockName].total = blockTotal;
    }

    calculateBlockPoints('„Sei beliebt!“', [1, 8, 11, 15, 20]);
    calculateBlockPoints('„Sei perfekt!“', [2, 7, 9, 16, 17]);
    calculateBlockPoints('„Sei selbstständig!“', [3, 6, 10, 13, 19]);
    calculateBlockPoints('„Sei effizient!“', [4, 5, 12, 14, 18]);

    var blockPointsArray = Object.entries(blockPoints);
    blockPointsArray.sort(function(a, b) {
        return b[1].total - a[1].total;
    });

    var htmlOutput = '';
    blockPointsArray.forEach(function(blockEntry) {
        var blockName = blockEntry[0];
        var blockTotal = blockEntry[1].total;
        var maxPossiblePoints = blockEntry[1].maxPossiblePoints;

        // Accordion
       
		htmlOutput += '<div class="accordion">' +
						'<button class="accordion-button">' + blockName + '<span class="accordion-icon">+</span></button>' +
						'<div class="panel">' +
							'<p>';

		// Hier kommen die Beschreibungen basierend auf blockName
		switch (blockName) {
			case '„Sei beliebt!“':
				htmlOutput += 'Das Bedürfnis nach Zugehörigkeit, Akzeptanz und Liebe liegt diesem Stressförderer zu Grunde. Situationen, in denen Ablehnung und Kritik drohen, etwa wenn es gilt, eigene Interessen zu vertreten oder Grenzen zu setzen, werden als besonders stressig empfunden. Ablehnung und Einsamkeit sollen umgangen werden, indem Konflikte vermieden und die Bedürfnisse anderer über die eigenen gestellt werden. Natürlich ist es sinnvoll, anderen zu helfen und Kompromisse einzugehen. Doch ein übermäßig ausgeprägter Stressförderer kann langfristig zu Enttäuschung, Frust und Erschöpfung führen.';
				break;
			case '„Sei perfekt!“':
				htmlOutput += 'Diesem Stressförderer liegt der Wunsch nach Selbstbestätigung und Erfolg durch gute Leistungen zu Grunde. Situationen, in denen Misserfolg und Versagen drohen, werden als besonders stressig empfunden. Scham über Unvollkommenheit und Fehler soll durch das Perfektionsstreben vermieden werden. Die Gefahren dieses Stressförderers liegen in übermäßigen Arbeitszeiten, überzogener Kritik an sich und anderen, sowie der Furcht, bei „Unvollkommenheit“ nicht akzeptiert zu werden. In vielen Aufgabenbereichen ist Perfektionsstreben hilfreich und wertvoll. Problematisch wird dieses erst, wenn er rigide in alle Lebensbereiche übertragen wird.';
				break;
			case '„Sei selbstständig!“':
				htmlOutput += 'Diesem Stressförderer liegt der Wunsch nach persönlicher Unabhängigkeit und Selbstbestimmung zu Grunde. Insbesondere Situationen, in denen eigene Hilfsbedürftigkeit und Schwächen erfahren werden und ein (potenzielles) Angewiesensein auf andere besteht, werden als stressig erlebt. Ziel ist das Erlangen eines Sicherheits- und Kontrollgefühls sowie die Vermeidung seelischer Verletzungen, indem Sorgen und Ängste für sich behalten und Aufgaben selbst erledigt werden. Das prinzipiell gesunde Autonomiestreben kann bei Übertreibung sehr kräftezehrend sein und verhindert, Hilfe anzunehmen.';
				break;
			case '„Sei effizient!“':
				htmlOutput += 'Hinter diesem Stressförderer steht der Wunsch nach angenehmen Emotionen und Erfahrungen. Insbesondere Situationen, in denen Geduld erforderlich ist und kein unmittelbares Ergebnis absehbar ist, werden als stressig empfunden. Ziel ist der Lustgewinn und die Vermeidung unangenehmen Erlebens indem versucht wird, alles sofort und auf einmal zu erledigen. Die Folgen sind Hektik, ein vorschnelles Suchen nach Lösungen und Fehleranfälligkeit. Effizienzstreben ist an sich eine nützliche Eigenschaft, kann bei Übertreibung aber zu Hektik, und langfristig in die Erschöpfung führen.';
				break;
			default:
				htmlOutput += 'Details zu den Fragen und Antworten dieser Kategorie.';
		}

		htmlOutput += '</p>' +
						'</div>' +
					  '</div>';


        // Fortschrittsbalken und Punktzahl
        htmlOutput += '<div class="block-summary">' +
                        '<div class="progress">' +
                            //'<div class="progress-label">' + blockName + '</div>' +
                            '<div class="progress-bar">' +
                                '<div class="progress-bar-inner" style="width: ' + (blockTotal / maxPossiblePoints * 100) + '%;"></div>' +
                            '</div>' +
                            '<div class="points">' + blockTotal + ' / ' + maxPossiblePoints + '</div>' +
                        '</div>' +
                      '</div>';
    });

    resultContainer.innerHTML = htmlOutput;

    var acc = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            var icon = this.querySelector(".accordion-icon");
            if (panel.style.display === "block") {
                panel.style.display = "none";
                icon.textContent = "+";
            } else {
                panel.style.display = "block";
                icon.textContent = "-";
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    document.getElementById('generate-pdf').addEventListener('click', function() {
        const doc = new jsPDF();
        const logoUrl = 'https://github.com/MiriamSchaub/test/blob/main/230620-digiBRAVE-Bayern-Logo-L-RGB.png';
        const title = "Ihre persönlichen Stressförderer";
        const text = "Was sind Ihre persönlichen stressfördernden Überzeugungen?";

        doc.addImage(logoUrl, 'PNG', 20, 15, 40, 30);
        doc.setFontSize(18);
        doc.text(title, 70, 25);
        doc.setFontSize(12);
        doc.text(text, 70, 35);

        // Tabelle hinzufügen
        let table = document.getElementById('radio-matrix-table');
        let rows = table.querySelectorAll('tbody tr');
        let data = [];

        let headerRow = [];
        let headerCells = table.querySelectorAll('thead th');
        headerCells.forEach((headerCell) => {
            headerRow.push(headerCell.textContent.trim());
        });
        data.push(headerRow);

        rows.forEach((row, rowIndex) => {
            let rowData = [];
            let cells = row.querySelectorAll('td');
            cells.forEach((cell, cellIndex) => {
                if (cellIndex === 0) {
                    rowData.push(cell.textContent.trim());
                } else {
                    let input = cell.querySelector('input[type="radio"]:checked');
                    if (input) {
                        rowData.push('X');
                    } else {
                        rowData.push('');
                    }
                }
            });
            data.push(rowData);
        });
		doc.setFillColor('#1B5681');
        doc.autoTable({
            head: [data[0]],
            body: data.slice(1),
            startY: 60, // Start der Tabelle auf Seite 1 bei Y-Position 
			styles: { 
                lineWidth: 0.5,
            },
            columnStyles: {
                0: { halign: 'left' },
                1: { halign: 'center' },
                2: { halign: 'center' },
                3: { halign: 'center' },
                4: { halign: 'center' },
            },
			headStyles: { fillColor: [27, 86, 129] }, // Farbe der Kopfzeile
            tableLineWidth: 0.75,
        });

        // Seitenumbruch manuell hinzufügen, um zur Seite 2 zu wechseln
        doc.addPage();
		
		// Einleitender Text vor der Auswertung
        doc.setFontSize(10);
        doc.text('Grundsätzlich gilt:', 20, 20);
        var introText = 'All diese Überzeugungen sind weder allgemein gut noch schlecht. Normen wie Perfektionismus und Co haben sich uns eingeprägt, weil sie im Lauf des Lebens bei der Erfüllung wichtiger psychologischer Grundbedürfnisse hilfreich waren und sind. Erst wenn diese Überzeugungen zur absoluten Forderung werden, also für das eigene Wohlbefinden unabdingbar werden, verursachen sie Probleme. Nicht die Werte an sich, sondern deren zu rigide Anwendung wirkt stressfördernd.';
        var textLines = doc.splitTextToSize(introText, 170);
		doc.setFontSize(9);
        doc.text(textLines, 20, 30);

        // Blockpunkte berechnen und ausgeben
        var blockPoints = {
            '„Sei beliebt!“': {
                total: 0,
                maxPossiblePoints: 15
            },
            '„Sei perfekt!“': {
                total: 0,
                maxPossiblePoints: 15
            },
            '„Sei selbstständig!“': {
                total: 0,
                maxPossiblePoints: 15
            },
            '„Sei effizient!“': {
                total: 0,
                maxPossiblePoints: 15
            }
        };

        function calculateBlockPoints(blockName, questionIndices) {
            var blockTotal = 0;
            questionIndices.forEach(function(index) {
                var answer = document.getElementById('quiz-form').elements['q' + index];
                if (answer && answer.value !== "") {
                    var selectedValue = parseInt(answer.value);
                    blockTotal += selectedValue;
                }
            });
            blockPoints[blockName].total = blockTotal;
        }

        calculateBlockPoints('„Sei beliebt!“', [1, 8, 11, 15, 20]);
        calculateBlockPoints('„Sei perfekt!“', [2, 7, 9, 16, 17]);
        calculateBlockPoints('„Sei selbstständig!“', [3, 6, 10, 13, 19]);
        calculateBlockPoints('„Sei effizient!“', [4, 5, 12, 14, 18]);

        var blockPointsArray = Object.entries(blockPoints);
        blockPointsArray.sort(function(a, b) {
            return b[1].total - a[1].total;
        });

        // startY für Seite 2
        let startY = 60;

        blockPointsArray.forEach(function(blockEntry) {
            var blockName = blockEntry[0];
            var blockTotal = blockEntry[1].total;
            var maxPossiblePoints = blockEntry[1].maxPossiblePoints;

            // Accordion Details
            doc.setFontSize(10);
            var textLines = doc.splitTextToSize(blockName, 170);
            doc.text(textLines, 20, startY);

            // Measure text height to avoid overflow
            var textHeight = doc.getTextDimensions(textLines).h;
            startY += textHeight + 5;

            doc.setFontSize(9);
            var description = getDescriptionForBlock(blockName);
            textLines = doc.splitTextToSize(description, 170);
            doc.text(textLines, 20, startY);

            // Measure text height again
            textHeight = doc.getTextDimensions(textLines).h;
            startY += textHeight + 5;

            // Draw rounded rectangle for progress bar background
            doc.setFillColor(220);
            doc.roundedRect(20, startY, 170, 5, 2, 2, 'F');

            // Calculate width of filled part of progress bar
            var filledWidth = (blockTotal / maxPossiblePoints * 170);

            // Draw filled part of progress bar with specified color
            doc.setFillColor('#1B5681');
            doc.roundedRect(20, startY, filledWidth, 5, 2, 2, 'F');

            // Punkte anzeigen
            // doc.setFontSize(10);
            doc.text(blockTotal + ' / ' + maxPossiblePoints, 20, startY + 10);

            startY += 25;
        });

        doc.save('Stressfoerderer-Test.pdf');
    });
});

// Funktion, die die Beschreibung für den jeweiligen Block zurückgibt
function getDescriptionForBlock(blockName) {
    switch (blockName) {
        case '„Sei beliebt!“':
            return 'Das Bedürfnis nach Zugehörigkeit, Akzeptanz und Liebe liegt diesem Stressförderer zu Grunde. Situationen, in denen Ablehnung und Kritik drohen, etwa wenn es gilt, eigene Interessen zu vertreten oder Grenzen zu setzen, werden als besonders stressig empfunden. Ablehnung und Einsamkeit sollen umgangen werden, indem Konflikte vermieden und die Bedürfnisse anderer über die eigenen gestellt werden. Natürlich ist es sinnvoll, anderen zu helfen und Kompromisse einzugehen. Doch ein übermäßig ausgeprägter Stressförderer kann langfristig zu Enttäuschung, Frust und Erschöpfung führen.';
        case '„Sei perfekt!“':
            return 'Diesem Stressförderer liegt der Wunsch nach Selbstbestätigung und Erfolg durch gute Leistungen zu Grunde. Situationen, in denen Misserfolg und Versagen drohen, werden als besonders stressig empfunden. Scham über Unvollkommenheit und Fehler soll durch das Perfektionsstreben vermieden werden. Die Gefahren dieses Stressförderers liegen in übermäßigen Arbeitszeiten, überzogener Kritik an sich und anderen, sowie der Furcht, bei „Unvollkommenheit“ nicht akzeptiert zu werden. In vielen Aufgabenbereichen ist Perfektionsstreben hilfreich und wertvoll. Problematisch wird dieses erst, wenn er rigide in alle Lebensbereiche übertragen wird.';
        case '„Sei selbstständig!“':
            return 'Diesem Stressförderer liegt der Wunsch nach persönlicher Unabhängigkeit und Selbstbestimmung zu Grunde. Insbesondere Situationen, in denen eigene Hilfsbedürftigkeit und Schwächen erfahren werden und ein (potenzielles) Angewiesensein auf andere besteht, werden als stressig erlebt. Ziel ist das Erlangen eines Sicherheits- und Kontrollgefühls sowie die Vermeidung seelischer Verletzungen, indem Sorgen und Ängste für sich behalten und Aufgaben selbst erledigt werden. Das prinzipiell gesunde Autonomiestreben kann bei Übertreibung sehr kräftezehrend sein und verhindert, Hilfe anzunehmen.';
        case '„Sei effizient!“':
            return 'Hinter diesem Stressförderer steht der Wunsch nach angenehmen Emotionen und Erfahrungen. Insbesondere Situationen, in denen Geduld erforderlich ist und kein unmittelbares Ergebnis absehbar ist, werden als stressig empfunden. Ziel ist der Lustgewinn und die Vermeidung unangenehmen Erlebens indem versucht wird, alles sofort und auf einmal zu erledigen. Die Folgen sind Hektik, ein vorschnelles Suchen nach Lösungen und Fehleranfälligkeit. Effizienzstreben ist an sich eine nützliche Eigenschaft, kann bei Übertreibung aber zu Hektik, und langfristig in die Erschöpfung führen.';
        default:
            return 'Details zu den Fragen und Antworten dieser Kategorie.';
    }
}

