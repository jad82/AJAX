//Potrzebne zmienne
var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('.countries');
var results = $('.results_list');
var details_list = $('.details_list');
var country = $('.country');
var capital = $('.capital');
var landArea = $('.land-area');
var language = $('.language');
var population = $('.population');

//Kliknięcie w wyszukiwanie wyszukaj
$('#search').click(searchCountries);
$('#search').click(hideSearcher);

//Ukrywanie przycisku "znajdź"
function hideSearcher () {
	$('#search').hide('#search');
}

//Funkcja wyszukiwania
function searchCountries() {
	var countryName = $('#country-search').val();
	if (!countriesList) countryName = 'Poland';
	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList
	});
};

//Pokazywanie odfiltrowanych wyników wyszukiwanie - zawężonych do name
function showCountriesList(resp) {
	resp.forEach(function(item) {
		var filtrName = item.name;
		var searchPhrase = $('#country-search').val();
		if (filtrName.includes(searchPhrase)) {
			$('<li>').addClass('country-name').text(item.name).appendTo('.results_list');
		}
	});
	$('#newSearch').show();
	countriesList.show();
	clickForDetails();
};

//Kliknięcie po więcej szczegółów
function clickForDetails() {
	$('li.country-name').on('click', function() {
		var countryName = $(this).text();
		$.ajax({
			url: url + countryName,
			method: 'GET',
			success: countryDetails
		});
	});
};

//Utworzenie listy z detalami kraju
function countryDetails(resp) {
	resp.forEach(function(item) {
		$('<span>').text(item.name).appendTo(country);
		$('<span>').text(item.capital).appendTo(capital);
		$('<span>').text(item.languages).appendTo(language);
		$('<span>').text(item.area).appendTo(landArea);
		$('<span>').text(item.population).appendTo(population);
	});
	showResult(); //prezentacja rozszerzonego wyniku
};

//Klik w "Nowe wyszukiwanie". Co tu się dzieje:
$('#newSearch').on('click', function() {
	hideList(); //ukrywamy listę z nazwami detali
	$('#country-search').val(''); //czyści input z wpisanej wcześniej frazy
	$('#search').show('#newSearch'); //pokazuje przycisk znajdź, który wcześniej został ukryty po pokazaniu wyników
	$('li').remove(); //usuwa wcześniej wyprodukowane li
});

function hideList() {
	countriesList.hide();
	details_list.hide();
	$('#newSearch').hide();
};

function showResult() {
	countriesList.show();
	details_list.show();
	$('#newSearch').show();
};

hideList();